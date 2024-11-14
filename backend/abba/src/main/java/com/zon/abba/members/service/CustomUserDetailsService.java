package com.zon.abba.members.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if ("user".equals(username)) {
            return org.springframework.security.core.userdetails.User.withUsername("user")
                    .password(passwordEncoder.encode("1234"))
                    .roles("USER")
                    .build();
        }
        throw new UsernameNotFoundException("User not found with username: " + username);
    }
}
