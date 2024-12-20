package com.zon.abba.address.repository;

import com.zon.abba.address.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, String> {
    @Query(value = "SELECT * FROM address " +
            "WHERE MemberID = :memberId AND DeleteYN = 'N' " +
            "ORDER BY " +
            "CASE " +
            "   WHEN MainAddress = 1 AND BillAddress = 1 THEN 1 " + // 둘 다 1인 경우
            "   WHEN MainAddress = 1 THEN 2 " +                   // mainAddress만 1
            "   WHEN BillAddress = 1 THEN 3 " +                   // billAddress만 1
            "   ELSE 4 " +                                        // 나머지
            "END, " +
            "CASE " +
            "   WHEN MainAddress != 1 AND BillAddress != 1 THEN CreatedDateTime " +
            "   ELSE NULL " +                                    // 우선순위 4에만 시간 순 정렬
            "END ASC " +
            "LIMIT 5",
            nativeQuery = true)
    List<Address> findSortedAddressesByMemberId(@Param("memberId") String memberId);

    Optional<Address> findByAddressId(String addressId);
}
