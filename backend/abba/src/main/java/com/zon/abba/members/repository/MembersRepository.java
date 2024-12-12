package com.zon.abba.members.repository;

import com.zon.abba.members.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MembersRepository extends JpaRepository<Member, String> {

    // 이메일로 member 조회
    Optional<Member> findByEmail(String email);

    // 이메일로 memberID 조회
    @Query(value = "SELECT MemberID FROM members WHERE Email = :email", nativeQuery = true)
    Optional<String> findMemberIDByEmail(@Param("email") String email);
}
