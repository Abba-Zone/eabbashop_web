package com.zon.abba.member.service;

import com.zon.abba.common.exception.NotMemberException;
import com.zon.abba.member.entity.Member;
import com.zon.abba.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService{

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Member> member = memberRepository.findByEmail(username);

        if(member.isPresent()){

            if(member.get().getDeleteYN().equals("Y")) throw new NotMemberException("탈퇴한 회원입니다.");

            return org.springframework.security.core.userdetails.User.withUsername(username)
                    .password(passwordEncoder.encode(member.get().getPassword()))
                    .roles(member.get().getRole())
                    .build();
        }

        throw new UsernameNotFoundException("User not found with email: " + username);
    }
}
