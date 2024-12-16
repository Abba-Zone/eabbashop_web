package com.zon.abba.member.repository;

import com.zon.abba.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecommendedMembersAlterLogRepository extends JpaRepository<Member, Long> {

    // 이메일로 member 조회
    Optional<Member> findByEmail(String email);

    // id로 member 조회
    Optional<Member> findByMemberId(String memberId);
}
