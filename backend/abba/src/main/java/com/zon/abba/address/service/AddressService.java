package com.zon.abba.address.service;

import com.zon.abba.address.dto.AddressDto;
import com.zon.abba.address.entity.Address;
import com.zon.abba.address.repository.AddressRepository;
import com.zon.abba.address.request.AddressRequest;
import com.zon.abba.address.request.RegisterAddressRequest;
import com.zon.abba.address.request.SetAddressRequest;
import com.zon.abba.address.request.UpdateAddressRequest;
import com.zon.abba.common.exception.NoDataException;
import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.exception.TooManyException;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.member.service.EmailService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AddressService {

    private static final Logger logger = LoggerFactory.getLogger(AddressService.class);
    private final AddressRepository addressRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public List<AddressDto> getAddressList(String memberId){
        logger.info("주소 목록을 가져옵니다.");

        List<Address> list = addressRepository.findSortedAddressesByMemberId(memberId);

        // 리스트가 비어있으면 null 반환
        if (list == null || list.isEmpty()) {
            return null;
        }

        // 리스트 개수가 많은 경우
        logger.info("리스트의 개수를 체크합니다.");
        if(list.size() > 5) {
            throw new TooManyException("너무 개수가 많습니다.");
        }
        //
        logger.info("메인 주소의 개수를 체크합니다.");
        // MainAddress가 여러 개인 경우 바로 예외를 던짐
        AtomicInteger mainAddressCount = new AtomicInteger(0);

        list.stream()
                .filter(Address::getMainAddress)
                .forEach(address -> {
                    if (mainAddressCount.incrementAndGet() > 1) {
                        throw new TooManyException("MainAddress 값이 여러 개입니다.");
                    }
                });

        logger.info("청구 주소의 개수를 체크합니다.");
        // BillAddress가 여러 개인 경우 바로 예외를 던짐
        AtomicInteger billAddressCount = new AtomicInteger(0);

        list.stream()
                .filter(Address::getBillAddress)
                .forEach(address -> {
                    if (billAddressCount.incrementAndGet() > 1) {
                        throw new TooManyException("BillAddress 값이 여러 개입니다.");
                    }
                });

        // 값이 있으면 리스트 반환
        return list.stream()
                .map(AddressDto::new)
                .toList();
    }

    @Transactional
    public ResponseListBody listAddress(){
        logger.info("회원 리스트 출력을 시작합니다.");

        logger.info("리스트 출력용 회원 정보를 가져옵니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        List<AddressDto> list = getAddressList(memberId);

        logger.info("회원 리스트 출력을 완료했습니다.");

        return new ResponseListBody((long) list.size(), list);
    }

    @Transactional
    public ResponseListBody registerAddress(RegisterAddressRequest registerAddressRequest){
        logger.info("주소를 등록을 시작합니다.");

        logger.info("주소 등록용 회원 정보를 가져옵니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        // 이미 5개 이상 등록된 상태면 막기...는 이야기하고...
        // main이 여러개 인 경우도 막고...

        logger.info("주소를 등록합니다.");
        Address address = Address.builder()
                .memberId(memberId)
                .mainAddress(registerAddressRequest.getIsMain())
                .billAddress(registerAddressRequest.getIsBill())
                .comment(registerAddressRequest.getComment())
                .addressName(registerAddressRequest.getName())
                .country(registerAddressRequest.getCountry())
                .zipCode(registerAddressRequest.getZipCode())
                .baseAddress(registerAddressRequest.getBaseAddress())
                .detailAddress(registerAddressRequest.getDetailAddress())
                .phone(registerAddressRequest.getPhone())
                .firstName(registerAddressRequest.getFirstName())
                .lastName(registerAddressRequest.getLastName())
                .createdId(memberId)
                .modifiedId(memberId)
                .build();

        addressRepository.save(address);

        List<AddressDto> list = getAddressList(memberId);

        logger.info("주소를 등록을 완료했습니다.");
        return new ResponseListBody((long) list.size(), list);
    }

    @Transactional
    public ResponseListBody deleteAddress(AddressRequest addressRequest){
        logger.info("주소를 삭제합니다.");

        logger.info("삭제할 주소를 찾습니다.");
        Address address = addressRepository.findByAddressId(addressRequest.getAddressId())
                .orElseThrow(() -> new NoDataException("없는 데이터입니다."));

        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        logger.info("삭제 설정 이후 저장합니다.");
        address.setDeleteYN("Y");
        address.setModifiedId(memberId);

        addressRepository.save(address);

        List<AddressDto> list = getAddressList(address.getMemberId());

        logger.info("주소 삭제 후 리스트 반환을 완료했습니다.");

        return new ResponseListBody((long) list.size(), list);
    }

    @Transactional
    public ResponseListBody updateAddress(UpdateAddressRequest updateAddressRequest){
        logger.info("주소를 수정합니다.");

        logger.info("수정할 주소를 찾습니다.");
        Address address = addressRepository.findByAddressId(updateAddressRequest.getAddressId())
                .orElseThrow(() -> new NoDataException("없는 데이터입니다."));

        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        logger.info("수정할 내용을 저장합니다.");
        address.setAddressName(updateAddressRequest.getName());
        address.setFirstName(updateAddressRequest.getFirstName());
        address.setLastName(updateAddressRequest.getLastName());
        address.setPhone(updateAddressRequest.getPhone());
        address.setCountry(updateAddressRequest.getCountry());
        address.setZipCode(updateAddressRequest.getZipCode());
        address.setBaseAddress(updateAddressRequest.getBaseAddress());
        address.setDetailAddress(updateAddressRequest.getDetailAddress());
        address.setComment(updateAddressRequest.getComment());
        address.setModifiedId(memberId);

        addressRepository.save(address);


        List<AddressDto> list = getAddressList(address.getMemberId());
        logger.info("주소 수정 후 리스트 반환을 완료했습니다.");

        return new ResponseListBody((long) list.size(), list);
    }

    @Transactional
    public ResponseListBody setAddress(SetAddressRequest setAddressRequest, int type){
        // type = 0 -> main
        // type = 1 -> bill
        // 각 주소가 원래 설정이 맞는지 더블 체크를 하는게 맞을까요

        logger.info("main 또는 bill을 수정합니다.");

        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        logger.info("바꿀 주소를 불러옵니다.");
        Address address = addressRepository.findByAddressId(setAddressRequest.getAddressId())
                .orElseThrow(() -> new NoDataException("없는 데이터입니다."));

        logger.info("이전 주소를 불러옵니다.");
        Address preAddress = addressRepository.findByAddressId(setAddressRequest.getPreAddressId())
                .orElseThrow(() -> new NoDataException("없는 데이터입니다."));

        // main 주소지 변경
        if(type == 0){
            logger.info("메인 주소지를 변경합니다.");
            address.setMainAddress(true);
            preAddress.setMainAddress(false);
        }else{ // bill 주소지 변경
            logger.info("청구 주소지를 변경합니다.");
            address.setBillAddress(true);
            preAddress.setBillAddress(false);

        }
        address.setModifiedId(memberId);
        preAddress.setModifiedId(memberId);

        addressRepository.save(address);
        addressRepository.save(preAddress);

        List<AddressDto> list = getAddressList(address.getMemberId());
        logger.info("주소 설정 후 리스트 반환을 완료했습니다.");

        return new ResponseListBody((long) list.size(), list);
    }
}
