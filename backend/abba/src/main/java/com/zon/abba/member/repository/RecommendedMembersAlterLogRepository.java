package com.zon.abba.member.repository;

import com.zon.abba.member.entity.Member;
import com.zon.abba.member.entity.RecommendedMembersAlterLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecommendedMembersAlterLogRepository extends JpaRepository<RecommendedMembersAlterLog, Long> {

}
