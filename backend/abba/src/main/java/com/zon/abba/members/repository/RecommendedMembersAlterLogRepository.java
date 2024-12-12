package com.zon.abba.members.repository;

import com.zon.abba.members.entity.Members;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecommendedMembersAlterLogRepository extends JpaRepository<Members, Long> {

    // 이메일로 member 조회
    Optional<Members> findByEmail(String email);

    // id로 member 조회
    Optional<Members> findByMemberId(String memberId);
}
