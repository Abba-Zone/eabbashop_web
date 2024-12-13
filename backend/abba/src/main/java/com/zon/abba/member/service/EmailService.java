package com.zon.abba.member.service;

import com.zon.abba.common.code.MailTitleCode;
import com.zon.abba.member.request.EmailRequest;
import com.zon.abba.member.response.EmailResponse;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class EmailService {
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;

    public EmailResponse sendMail(EmailRequest emailRequest){
        String code = createCode();
        EmailResponse emailResponse = new EmailResponse(code);

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        MailTitleCode mailTitleCode = MailTitleCode.EMAIL;

        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            mimeMessageHelper.setTo(emailRequest.getEmail()); // 메일 수신자
            mimeMessageHelper.setSubject(mailTitleCode.getMessage()); // 메일 제목
            mimeMessageHelper.setText(setContext(code, mailTitleCode), true); // 메일 본문 내용, HTML 여부
            javaMailSender.send(mimeMessage);

            logger.info("Success");

            return emailResponse;

        } catch (MessagingException e) {
            logger.info("fail");
            throw new RuntimeException(e);
        }

    }

    // 인증번호 및 임시 비밀번호 생성 메서드
    public String createCode() {
        Random random = new Random();
        StringBuffer key = new StringBuffer();

        for (int i = 0; i < 6; i++) {
            int index = random.nextInt(2);

            if(index == 0) key.append((char) ((int) random.nextInt(26) + 65));
            else key.append(random.nextInt(10));
        }
        return key.toString();
    }

    public String setContext(String code, MailTitleCode mailTitleCode) {
        Context context = new Context();
        context.setVariable("code", code);
        return templateEngine.process(mailTitleCode.getCode(), context);
    }

}
