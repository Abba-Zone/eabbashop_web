package com.zon.abba.point.service;

import com.zon.abba.common.exception.NoDataException;
import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.request.RequestList;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.point.dto.TransferDto;
import com.zon.abba.point.entity.Transfer;
import com.zon.abba.point.mapping.TransferList;
import com.zon.abba.point.repository.TransferRepository;
import com.zon.abba.point.request.TransferIdRequest;
import com.zon.abba.point.request.TransferRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransferService {
    private static final Logger logger = LoggerFactory.getLogger(TransferService.class);

    private final JwtTokenProvider jwtTokenProvider;
    private final TransferRepository transferRepository;
    private final PointService pointService;

    @Transactional
    public ResponseBody pointTransfer(TransferRequest request){
        logger.info("포인트를 이체합니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        Transfer transfer = Transfer.builder()
                .senderId(memberId)
                .receiverId(request.getReceiverID())
                .lp(request.getLP())
                .ak(request.getAK())
                .sp(request.getSP())
                .message(request.getMessage())
                .status("A")
                .createdId(memberId)
                .modifiedId(memberId)
                .build();

        transferRepository.save(transfer);

        pointService.transfer(transfer);

        return new ResponseBody("성공했습니다.");
    }

    @Transactional
    public ResponseBody requestCancelTransfer(TransferIdRequest request){
        logger.info("포인트 이체 취소를 신청합니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        Transfer transfer = transferRepository.findById(request.getTransferID())
                        .orElseThrow(() -> new NoDataException("없는 이체 정보입니다."));

        transfer.setStatus("B");
        transfer.setModifiedId(memberId);

        return new ResponseBody("성공했습니다.");
    }

    @Transactional
    public ResponseListBody cancelTransferList(RequestList request){
        logger.info("포인트 이체 취소 신청 리스트를 반환합니다.");

        Pageable pageable = PageRequest.of(
                request.getPageNo(),
                request.getPageSize(),
                Sort.by(request.getSort().equals("ASC") ?
                                Sort.Direction.ASC : Sort.Direction.DESC,
                        request.getSortValue())
        );

        Page<TransferList> pages = transferRepository.findByFilterAndStatus(
                request.getFilter(),
                request.getFilterValue(),
                "B",
                pageable
        );

        List<TransferDto> list = pages.stream()
                .map(TransferDto::new)
                .toList();

        return new ResponseListBody(pages.getTotalElements(), list);
    }
}
