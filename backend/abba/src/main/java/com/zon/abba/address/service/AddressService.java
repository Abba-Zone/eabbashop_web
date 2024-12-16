package com.zon.abba.address.service;

import com.zon.abba.address.dto.AddressDto;
import com.zon.abba.address.entity.Address;
import com.zon.abba.address.repository.AddressRepository;
import com.zon.abba.member.service.EmailService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AddressService {

    private static final Logger logger = LoggerFactory.getLogger(AddressService.class);
    private final AddressRepository addressRepository;

    @Transactional
    public List<AddressDto> getAddressList(String memberId){
        logger.info("주소 목록을 가져옵니다.");

        List<Address> list = addressRepository.findSortedAddressesByMemberId(memberId);

        // 리스트가 비어있으면 null 반환
        if (list == null || list.isEmpty()) {
            return null;
        }
        // 값이 있으면 리스트 반환
        return list.stream()
                .map(AddressDto::new)
                .toList();
    }
}
