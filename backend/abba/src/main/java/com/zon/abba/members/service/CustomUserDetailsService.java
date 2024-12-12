package com.zon.abba.members.service;

import com.zon.abba.members.entity.Member;
import com.zon.abba.members.repository.MembersRepository;
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

    private final MembersRepository membersRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Member> member = membersRepository.findByEmail(username);
        if(member.isPresent()){
            return org.springframework.security.core.userdetails.User.withUsername(username)
                    .password(passwordEncoder.encode(member.get().getPassword()))
                    .roles(member.get().getRole())
                    .build();
        }

        throw new UsernameNotFoundException("User not found with email: " + username);
    }
}
