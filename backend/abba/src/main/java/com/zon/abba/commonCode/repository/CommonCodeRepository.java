package com.zon.abba.commonCode.repository;

import com.zon.abba.commonCode.entity.CommonCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommonCodeRepository extends JpaRepository<CommonCode, String> {
    CommonCode getByCommonCodeId(String commoncodeId);


    CommonCode getByCodeGroupAndCode(String CodeGroup, String Code);
}
