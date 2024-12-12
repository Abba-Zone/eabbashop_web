package com.zon.abba.members.repository;

import com.zon.abba.members.entity.RecommendedMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecommendedMemberRepository extends JpaRepository<RecommendedMember, String> {
}
