package com.zon.abba.auth.repository;

import com.zon.abba.auth.entity.Role;
import com.zon.abba.auth.response.RoleListResponse;
import com.zon.abba.auth.response.RoleListDetail;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {

    // RoleID로 조회
    Optional<Role> findByRoleId(String roleId);

    // AuthDetail에서 메뉴 이름까지 가져오는 쿼리
    @Query("SELECT new com.zon.abba.auth.response.RoleListDetail(a.authId, a.authName, a.path, a.viewMenuYn, a.useYn, a.grade) " +
            "FROM Auth a JOIN a.roleDetails rd")
    List<RoleListDetail> findAuthDetails();


    // Role 목록 가져오기 (AuthList용)
    @Query("SELECT new com.zon.abba.auth.response.RoleListResponse(r.roleId, r.roleName) " +
            "FROM Role r")
    List<RoleListResponse> findAllRoles();

    // 특정 Role에 속한 메뉴 목록 가져오기 (AuthListDetail용)
    @Query("SELECT new com.zon.abba.auth.response.RoleListDetail(a.authId, a.authName, a.path, a.viewMenuYn, a.useYn, a.grade) " +
            "FROM RoleDetail rd " +
            "JOIN rd.auth a " +
            "WHERE rd.role.roleId = :roleId")
    List<RoleListDetail> findAuthDetailsByRoleId(@Param("roleId") String roleId);
}
