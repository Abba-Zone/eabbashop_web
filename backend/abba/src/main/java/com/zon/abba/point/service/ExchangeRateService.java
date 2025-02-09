package com.zon.abba.point.service;

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
    private final RedisService redisService;

    public void getExchangeRate(String currencyCode) {
        RestTemplate restTemplate = new RestTemplate();
        ExchangeRateResponse response = restTemplate.getForObject(API_URL, ExchangeRateResponse.class);

        if (response != null) {
            Map<String, Double> rates = response.getConversionRates();
            redisService.saveExchange(currencyCode, rates.getOrDefault(currencyCode, null));
        }
    }

    /**
     * 원화(KRW)를 달러(USD)로 변환
     * @param krwAmount 원화 금액
     * @return 변환된 USD 금액
     */
    public BigDecimal convertToUSD(BigDecimal krwAmount) {
        Double exchangeRate = (Double) redisService.get("KRW"); // KRW 기준 환율 가져오기
        if (exchangeRate == null) {
            throw new RuntimeException("환율 정보를 가져올 수 없습니다.");
        }
        return krwAmount.divide(BigDecimal.valueOf(exchangeRate), 2, RoundingMode.HALF_UP);
    }
}
