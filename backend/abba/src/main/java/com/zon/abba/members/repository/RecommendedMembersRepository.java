package com.zon.abba.members.repository;

import com.zon.abba.members.entity.Member;
import com.zon.abba.members.entity.RecommendedMembers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecommendedMembersRepository extends JpaRepository<RecommendedMembers, String> {
}
