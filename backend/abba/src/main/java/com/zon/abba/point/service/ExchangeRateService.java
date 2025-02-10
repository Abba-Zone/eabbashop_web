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
    @Value("${spring.exchange.url}")
    private String API_URL;
    @Value("${spring.exchange.redis-buy-key}")
    private String EXCHANGE_BUY_KEY;
    @Value("${spring.exchange.redis-sell-key}")
    private String EXCHANGE_SELL_KEY;

    private static final Logger logger = LoggerFactory.getLogger(ExchangeRateService.class);
    private final RedisService redisService;

//    public void getExchangeRate() {
//        RestTemplate restTemplate = new RestTemplate();
//        ExchangeRateResponse response = restTemplate.getForObject(API_URL, ExchangeRateResponse.class);
//
//        if (response != null) {
//            Map<String, Double> rates = response.getConversionRates();
//            redisService.saveExchange(EXCHANGE_KEY, rates);
//        }
//    }
//
//
//    public Map<String, Double> getExchangeRates(Integer type) {
//        if(type)
//        Object redisData = redisService.get(EXCHANGE_KEY);
//        if (redisData == null) {
//            throw new RuntimeException("환율 정보를 가져올 수 없습니다.");
//        }
//
//        try {
//            return objectMapper.convertValue(redisData, new TypeReference<Map<String, Double>>() {
//            });
//        } catch (Exception e) {
//            throw new RuntimeException("환율 정보 변환 중 오류 발생", e);
//        }
//    }

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
//        logger.info(String.valueOf(rate));
        return krwAmount.divide(rate, 2, RoundingMode.HALF_UP);
    }
}
