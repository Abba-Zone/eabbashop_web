package com.zon.abba.members.service;

import com.zon.abba.members.entity.Member;
import com.zon.abba.members.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserDetails loadUserByUsername(UUID username) throws UsernameNotFoundException {
        Optional<Member> member = memberRepository.findByMemberId(username);
        if(member.isPresent()){
            return org.springframework.security.core.userdetails.User.withUsername(member.get().getEmail())
                    .password(passwordEncoder.encode(member.get().getPassword()))
                    .roles(member.get().getRole())
                    .build();
        }

        throw new UsernameNotFoundException("User not found with memberId: " + username);
    }
}
