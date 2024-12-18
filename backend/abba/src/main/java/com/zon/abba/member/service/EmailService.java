package com.zon.abba.member.service;

import com.zon.abba.common.code.MailTitleCode;
import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.exception.NotCodeException;
import com.zon.abba.common.redis.RedisService;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.member.entity.Member;
import com.zon.abba.member.repository.MemberRepository;
import com.zon.abba.member.request.email.CodeRequest;
import com.zon.abba.member.request.email.EmailRequest;
import com.zon.abba.member.response.EmailCodeResponse;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class EmailService {
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;
    private final MemberRepository memberRepository;
    private final RedisService redisService;

    @Transactional
    public ResponseBody checkEmail(EmailRequest emailRequest){
        // 유저 이메일을 바탕으로 member 체크
        Optional<Member> memberOptional = memberRepository.findByEmail(emailRequest.getEmail());

        if(memberOptional.isEmpty()) throw new NoMemberException("없는 회원 정보입니다.");
        else return new ResponseBody("성공했습니다.");
    }

    @Transactional
    public ResponseBody validateCode(CodeRequest codeRequest){
        logger.info("code를 검증합니다. {}", codeRequest.getCode());
        Object email = redisService.get(codeRequest.getCode());
        if(email == null){
            throw new NotCodeException("유효하지 않은 코드입니다.");
        }
        // 코드가 통과되면 redis에서 코드 삭제
        redisService.delete(codeRequest.getCode());

        logger.info("code를 검증 완료");
        return new ResponseBody("성공했습니다.");
    }

    @Transactional
    public EmailCodeResponse sendMail(EmailRequest emailRequest){
        String code = createCode();
        EmailCodeResponse emailCodeResponse = new EmailCodeResponse(code);

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        MailTitleCode mailTitleCode = MailTitleCode.EMAIL;

        // 5분 동안 redis에 저장
        redisService.save(code, emailRequest.getEmail());

        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            mimeMessageHelper.setTo(emailRequest.getEmail()); // 메일 수신자
            mimeMessageHelper.setSubject(mailTitleCode.getMessage()); // 메일 제목
            mimeMessageHelper.setText(setContext(code, mailTitleCode), true); // 메일 본문 내용, HTML 여부
            javaMailSender.send(mimeMessage);

            logger.info("Success");

            return emailCodeResponse;

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
