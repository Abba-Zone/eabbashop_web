package com.zon.abba.member.repository;

import com.zon.abba.member.entity.Member;
import lombok.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    @Query(value = "SELECT MemberID FROM Members WHERE Email = :email", nativeQuery = true)
    Optional<String> findMemberIDByEmail(@Param("email") String email);


    @Query(value = "SELECT * FROM Members m " +
            "WHERE (:filter IS NULL OR " +
            "       CASE " +
            "           WHEN :filter = 'email' THEN m.email LIKE CONCAT('%', :filterValue, '%') " +
//            "           WHEN :filter = 'name' THEN m.name LIKE CONCAT('%', :filterValue, '%') " +
            "           WHEN :filter = 'phone' THEN m.phone LIKE CONCAT('%', :filterValue, '%') " +
            "       END) ",
            countQuery = "SELECT COUNT(*) FROM Members m " +
                    "WHERE (:filter IS NULL OR " +
                    "       CASE " +
                    "           WHEN :filter = 'email' THEN m.email LIKE CONCAT('%', :filterValue, '%') " +
//                    "           WHEN :filter = 'name' THEN m.name LIKE CONCAT('%', :filterValue, '%') " +
                    "           WHEN :filter = 'phone' THEN m.phone LIKE CONCAT('%', :filterValue, '%') " +
                    "       END) ",
            nativeQuery = true)
    Page<Member> findAllWithFilter(
            @Param("filter") String filter,
            @Param("filterValue") String filterValue,
            Pageable pageable
    );
}
