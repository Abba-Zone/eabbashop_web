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
import java.util.HashMap;
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
    private final ObjectMapper objectMapper;

//    public Map<String, BigDecimal> getExchangeRates(String key) {
//        Object data = redisService.hashGet(key);
//
//        if (data == null) {
//            throw new RuntimeException("데이터를 찾을 수 없습니다.");
//        }
//
//        try {
//            // Object를 JSON 문자열로 변환 후 Map<String, BigDecimal>로 변환
//            String json = objectMapper.writeValueAsString(data);
//            return objectMapper.readValue(json, new TypeReference<Map<String, BigDecimal>>() {});
//        } catch (Exception e) {
//            throw new RuntimeException("데이터 변환 실패", e);
//        }
//    }

    /**
     * code(통화 코드)를 달러(USD)로 변환
     * @param amount 기존 금액
     * @return 변환된 USD 금액
     * type 0 : buy
     * type 1 : sell
     */
    public BigDecimal convertToUSD(BigDecimal amount, String code, Integer type) {
        logger.info("{}의 환율 정보를 가져옵니다.", code);
        double exchangeRate = 0.0;
        if(type == 0){
            exchangeRate = Double.parseDouble((String) redisService.hashGet(EXCHANGE_BUY_KEY, code));
        } else if (type == 1) {
            exchangeRate = Double.parseDouble((String) redisService.hashGet(EXCHANGE_SELL_KEY, code));
        }

        BigDecimal rate = BigDecimal.valueOf(exchangeRate);
        logger.info("{} -> USD 적용 환율: {}", code, rate);

        return amount.divide(rate, 4, RoundingMode.HALF_UP);
    }

    /**
     * 달러(USD)를 통화로 변환
     * @param point 금액
     * @return 변환된 달러화 금액
     * @param type 0 : buy (매입 환율 적용)
     * @param type 1 : sell (매도 환율 적용)
     */
    public BigDecimal convertToCurrency(BigDecimal point, String code, Integer type) {
        logger.info("포인트 변환을 {}의 환율 정보를 가져옵니다.", code);
        double exchangeRate = 0.0;
        if(type == 0){
            exchangeRate = Double.parseDouble((String) redisService.hashGet(EXCHANGE_BUY_KEY, code));
        } else if (type == 1) {
            exchangeRate = Double.parseDouble((String) redisService.hashGet(EXCHANGE_SELL_KEY, code));
        }

        BigDecimal rate = BigDecimal.valueOf(exchangeRate);
        logger.info("USD -> {} 적용 환율: {}", code, rate);

        return point.multiply(rate).setScale(4, RoundingMode.HALF_UP);
    }
}
