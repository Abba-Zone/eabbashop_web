package com.zon.abba.member.repository;

import com.zon.abba.member.entity.ChangeRequestLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChangeRequestLogRepository extends JpaRepository<ChangeRequestLog, String> {
    //List<ChangeRequestLog> findByMemberIdAndDeleteYN(String memberId, String deleteYN);
    List<ChangeRequestLog> findByMemberId(String memberId);

}
