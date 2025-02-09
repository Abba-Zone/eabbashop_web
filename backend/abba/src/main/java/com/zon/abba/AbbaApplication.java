package com.zon.abba;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class AbbaApplication {

	public static void main(String[] args) {
		SpringApplication.run(AbbaApplication.class, args);
	}

}
