package com.zon.abba.members.repository;

import com.zon.abba.members.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {

    // 이메일로 member 조회
    Optional<Member> findByEmail(String email);

    // id로 member 조회
    Optional<Member> findByMemberId(String memberId);
}
