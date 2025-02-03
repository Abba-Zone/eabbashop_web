package com.zon.abba.auth.repository;

import com.zon.abba.auth.entity.Auth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthRepository extends JpaRepository<Auth, String> {

    List<Auth> findByAuthIdIn(List<String> authIdList);

}

