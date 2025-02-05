package com.zon.abba.commonCode.repository;

import com.zon.abba.commonCode.entity.CommonCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommonCodeRepository extends JpaRepository<CommonCode, String> {
    CommonCode getByCommonCodeId(String commoncodeId);


    CommonCode getByCodeGroupAndCode(String CodeGroup, String Code);

    @Query("SELECT c FROM CommonCode c WHERE c.codeGroup = :codeGroup AND c.deleteYN = 'N' AND c.activeYN = 'Y'")
    List<CommonCode> findActiveCommonCodesByCodeGroup(@Param("codeGroup") String codeGroup);
}
