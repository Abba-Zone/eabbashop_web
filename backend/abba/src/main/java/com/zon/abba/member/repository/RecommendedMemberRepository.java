package com.zon.abba.member.repository;

import com.zon.abba.member.entity.RecommendedMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecommendedMemberRepository extends JpaRepository<RecommendedMember, String> {
}
