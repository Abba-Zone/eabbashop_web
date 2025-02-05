package com.zon.abba.point.service;

import com.zon.abba.common.exception.CommonException;
import com.zon.abba.common.exception.ErrorCode;
import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseDataBody;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.member.service.SellerService;
import com.zon.abba.point.entity.PointHolding;
import com.zon.abba.point.repository.PointHoldingRepository;
import com.zon.abba.point.request.PointAccountRequest;
import com.zon.abba.point.request.PointHoldingRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;

@Service
@RequiredArgsConstructor
public class PointService {
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private final PointHoldingRepository pointHoldingRepository;
    private static final Logger logger = LoggerFactory.getLogger(SellerService.class);


    // 🔥 포인트 저장 (INSERT)
    public ResponseBody savePoint(PointHoldingRequest pointHoldingReq) {

        logger.info("유저 정보를 가져옵니다.");
        String adminID = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("204", "없는 회원입니다."));

        // 저장
        PointHolding pointHolding = new PointHolding();
        pointHolding.setOrderDetailId(pointHoldingReq.getOrderDetailId());
        pointHolding.setType(pointHoldingReq.getType());
        pointHolding.setAk(pointHoldingReq.getAk());
        pointHolding.setLp(pointHoldingReq.getLp());
        pointHolding.setSp(pointHoldingReq.getSp());
        pointHolding.setStatus("1");

        pointHoldingRepository.save(pointHolding);

        return new ResponseBody( "성공했습니다." );

    }

    public ResponseBody accountPoint(PointAccountRequest pointAccountRequest) {

        logger.info("유저 정보를 가져옵니다.");
        String adminID = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("204", "없는 회원입니다."));

        // 저장
        int updatedRows = pointHoldingRepository.updateStatusByHoldingId(pointAccountRequest.getHoldingId(), "B");

        if(updatedRows == 0)
            throw new CommonException(ErrorCode.DATA_UPDATE_FAILED);

        return new ResponseBody( "성공했습니다." );

    }

}
