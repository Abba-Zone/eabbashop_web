package com.zon.abba.member.repository;

import com.zon.abba.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {

    // 이메일로 member 조회
    Optional<Member> findByEmail(String email);

    // ID로 member 조회
    Optional<Member> findOneByMemberId(String memberID);

    // 이메일로 memberID 조회
    @Query(value = "SELECT MemberID FROM members WHERE Email = :email", nativeQuery = true)
    Optional<String> findMemberIDByEmail(@Param("email") String email);
}
