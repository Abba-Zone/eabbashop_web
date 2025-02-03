package com.zon.abba.common.listener;

import com.zon.abba.common.scheduler.SchedulerService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StartupListener implements ApplicationListener<ApplicationReadyEvent> {
    private final SchedulerService schedulerService;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        schedulerService.restoreSchedulersFromRedis();
    }
}