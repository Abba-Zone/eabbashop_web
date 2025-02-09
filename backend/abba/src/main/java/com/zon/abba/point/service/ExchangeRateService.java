package com.zon.abba.point.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zon.abba.common.redis.RedisService;
import com.zon.abba.point.response.ExchangeRateResponse;
import lombok.RequiredArgsConstructor;
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
    @Value("${spring.exchange.redis-key}")
    private String EXCHANGE_KEY;

    private final RedisService redisService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public void getExchangeRate() {
        RestTemplate restTemplate = new RestTemplate();
        ExchangeRateResponse response = restTemplate.getForObject(API_URL, ExchangeRateResponse.class);

        if (response != null) {
            Map<String, Double> rates = response.getConversionRates();
            redisService.saveExchange(EXCHANGE_KEY, rates);
        }
    }

    public Map<String, Double> getExchangeRates() {
        Object redisData = redisService.get(EXCHANGE_KEY);
        if (redisData == null) {
            throw new RuntimeException("환율 정보를 가져올 수 없습니다.");
        }

        try {
            return objectMapper.convertValue(redisData, new TypeReference<Map<String, Double>>() {
            });
        } catch (Exception e) {
            throw new RuntimeException("환율 정보 변환 중 오류 발생", e);
        }
    }

    /**
     * 원화(KRW)를 달러(USD)로 변환
     * @param krwAmount 원화 금액
     * @return 변환된 USD 금액
     */
    public BigDecimal convertToUSD(BigDecimal krwAmount, String code) {
        Map<String, Double> rates = getExchangeRates();
        Double exchangeRate = rates.get(code); // KRW 기준 환율 가져오기
        if (exchangeRate == null) {
            throw new RuntimeException("환율 정보를 가져올 수 없습니다.");
        }
        return krwAmount.divide(BigDecimal.valueOf(exchangeRate), 2, RoundingMode.HALF_UP);
    }
}
