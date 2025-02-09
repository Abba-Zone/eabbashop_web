package com.zon.abba.common.scheduler;

import com.zon.abba.point.service.ExchangeRateService;
import com.zon.abba.point.service.PointService;
import com.zon.abba.order.repository.OrderDetailRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.*;

@Service
@RequiredArgsConstructor
public class SchedulerService {
    private static final Logger logger = LoggerFactory.getLogger(SchedulerService.class);

    private final OrderDetailRepository orderDetailRepository;
    private final PointService pointService;
    private final ExchangeRateService exchangeRateService;
    private final StringRedisTemplate redisTemplate;
    private final ThreadPoolTaskScheduler scheduler;
    private final Map<String, ScheduledFuture<?>> runningSchedulers = new ConcurrentHashMap<>();

    private static final String REDIS_KEY = "order_schedulers";  // Redis 저장 키

    // 구매 확정 예약 (10일 후 실행)
    @Transactional
    public void scheduleOrderConfirmation(String orderDetailId) {
        LocalDateTime endTime = LocalDateTime.now().plusDays(10);
//        LocalDateTime endTime = LocalDateTime.now().plusMinutes(1);
        long delay = Duration.between(LocalDateTime.now(), endTime).toSeconds();

        ScheduledFuture<?> future = scheduler.schedule(() -> confirmOrder(orderDetailId),
                LocalDateTime.now().plusSeconds(delay).atZone(java.time.ZoneId.systemDefault()).toInstant());

        // Redis에 스케줄러 등록 (endTime 저장)
        redisTemplate.opsForValue().set(REDIS_KEY + orderDetailId, endTime.toString());

        // 현재 실행 중인 스케줄러 저장
        runningSchedulers.put(orderDetailId, future);
    }

    // 구매 확정 실행
    @Transactional
    public void confirmOrder(String orderDetailId) {
        logger.info("스케줄러 실행됨: {}", orderDetailId);

        orderDetailRepository.findById(orderDetailId).ifPresent(orderDetail -> {
            int status = orderDetail.getStatus();
            if(status == 300){
                orderDetail.setStatus(500);
                orderDetail.setModifiedId("admin");
                pointService.settleOrder(orderDetailId);
                orderDetailRepository.save(orderDetail);
            }else logger.info("order detail id : {}의 상태 변경이 없습니다.", orderDetailId);

        });

        // 실행 완료 후 맵에서 제거
        runningSchedulers.remove(orderDetailId);
        redisTemplate.delete(REDIS_KEY + orderDetailId);
    }

    public void removeScheduler(String orderDetailId){
        ScheduledFuture<?> future = runningSchedulers.get(orderDetailId);
        if (future != null) {
            future.cancel(false);
            runningSchedulers.remove(orderDetailId);
            redisTemplate.delete(REDIS_KEY + orderDetailId);
            logger.info("스케줄러 삭제됨: {}", orderDetailId);
        }
    }

    // 서버 시작 시 Redis에서 스케줄러 복구
    public void restoreSchedulersFromRedis() {
        Set<String> keys = redisTemplate.keys(REDIS_KEY + "*");

        for (String key : keys) {
            String orderDetailId = key.replace(REDIS_KEY, "");
            String endTimeStr = redisTemplate.opsForValue().get(key);
            LocalDateTime endTime = LocalDateTime.parse(endTimeStr);

            // 현재 시간과 비교
            long remainingTime = Duration.between(LocalDateTime.now(), endTime).toSeconds();

            if (remainingTime <= 0) {
                // ⏳ 이미 시간이 지났다면 즉시 confirm 실행
                confirmOrder(orderDetailId);
            } else {
                // ⏳ 아직 시간이 남아있다면 남은 시간만큼 다시 스케줄링
                ScheduledFuture<?> future = scheduler.schedule(() -> confirmOrder(orderDetailId),
                        Instant.now().plusSeconds(remainingTime));

                runningSchedulers.put(orderDetailId, future);
            }
        }

        // 🔹 서버 시작 시 환율 스케줄러도 확인 후 실행
        logger.info("🔄 Redis에서 환율 스케줄 복구...");
        scheduleExchangeRateUpdate();

        logger.info("🟢 서버 시작 - Redis에서 스케줄러 정보를 복구 완료");
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void scheduleExchangeRateUpdate() {
        logger.info("🔄 환율 정보 업데이트 실행...");
        exchangeRateService.getExchangeRate(); // 환율 업데이트
        logger.info("✅ 환율 정보 업데이트 완료.");
    }

}
