package com.zon.abba.common.swagger;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API 문서")
                        .version("1.0")
                        .description("SpringDoc을 사용한 API 문서입니다."))
                .addServersItem(new Server()
                        .url("https://abbazon.global/api")
                        .description("Production Server"))
                .addServersItem(new Server()
                        .url("http://localhost:8080/api")
                        .description("Local Development Server"));
    }
}
