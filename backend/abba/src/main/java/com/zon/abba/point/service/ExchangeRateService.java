package com.zon.abba.point.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zon.abba.common.redis.RedisService;
import com.zon.abba.point.response.ExchangeRateResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ExchangeRateService {
    @Value("${spring.exchange.redis-buy-key}")
    private String EXCHANGE_BUY_KEY;
    @Value("${spring.exchange.redis-sell-key}")
    private String EXCHANGE_SELL_KEY;

    private static final Logger logger = LoggerFactory.getLogger(ExchangeRateService.class);
    private final RedisService redisService;

    /**
     * 원화(KRW)를 달러(USD)로 변환
     * @param krwAmount 원화 금액
     * @return 변환된 USD 금액
     * type 0 : buy
     * type 1 : sell
     */
    public BigDecimal convertToUSD(BigDecimal krwAmount, Integer type) {
        Double exchangeRate = 0.0;
        if(type == 0){
            exchangeRate = (Double) redisService.get(EXCHANGE_BUY_KEY);
        } else if (type == 1) {
            exchangeRate = (Double) redisService.get(EXCHANGE_SELL_KEY);
        }

        if (exchangeRate == null) {
            throw new RuntimeException("환율 정보를 가져올 수 없습니다.");
        }

        BigDecimal rate = BigDecimal.valueOf(exchangeRate);
        logger.info("KRW -> USD 적용 환율: {}", rate);

        return krwAmount.divide(rate, 2, RoundingMode.HALF_UP);
    }

    /**
     * 달러(USD)를 원화(KRW)로 변환
     * @param usdAmount 달러 금액
     * @return 변환된 원화 금액
     * @param type 0 : buy (매입 환율 적용)
     * @param type 1 : sell (매도 환율 적용)
     */
    public BigDecimal convertToKRW(BigDecimal usdAmount, Integer type) {
        Double exchangeRate = 0.0;

        if (type == 0) {
            exchangeRate = (Double) redisService.get(EXCHANGE_BUY_KEY);  // 매입 환율
        } else if (type == 1) {
            exchangeRate = (Double) redisService.get(EXCHANGE_SELL_KEY); // 매도 환율
        }

        if (exchangeRate == null) {
            throw new RuntimeException("환율 정보를 가져올 수 없습니다.");
        }

        BigDecimal rate = BigDecimal.valueOf(exchangeRate);
        logger.info("USD -> KRW 적용 환율: {}", rate);

        return usdAmount.multiply(rate).setScale(2, RoundingMode.HALF_UP);
    }
}
