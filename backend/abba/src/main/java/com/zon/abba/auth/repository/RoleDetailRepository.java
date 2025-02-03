package com.zon.abba.auth.repository;

import com.zon.abba.auth.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoleDetailRepository extends JpaRepository<RoleDetail, String> {

    // 특정 RoleDetailID로 조회
    Optional<RoleDetail> findByRoleDetailId(String roleDetailId);

    // 특정 RoleID로 RoleDetail 조회 (권한에 속한 메뉴 리스트)
    List<RoleDetail> findByRoleRoleId(String roleId);

    // 특정 authID로 RoleDetail 조회 (특정 메뉴에 속한 권한 리스트)
    List<RoleDetail> findByAuthAuthId(String authId);
}
