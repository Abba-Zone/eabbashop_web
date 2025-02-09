package com.zon.abba.account.service;

import com.zon.abba.account.dto.WalletDto;
import com.zon.abba.account.response.WalletListDetailResponse;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseDataBody;
import com.zon.abba.point.entity.ABZPointsHistory;
import com.zon.abba.account.entity.Wallet;
import com.zon.abba.point.repository.ABZPointsHistoryRepository;
import com.zon.abba.point.repository.PointsHistoryRepository;
import com.zon.abba.account.repository.WalletRepository;
import com.zon.abba.account.request.WalletListRequest;
import com.zon.abba.account.response.WalletListResponse;
import com.zon.abba.account.response.WalletResponse;
import com.zon.abba.common.DateUtil;
import com.zon.abba.common.exception.NoDataException;
import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.member.entity.Member;
import com.zon.abba.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WalletService {
    private static final Logger logger = LoggerFactory.getLogger(WalletService.class);

    private final WalletRepository walletRepository;

    private final ABZPointsHistoryRepository abzPointsHistoryRepository;
    private final MemberRepository memberRepository;
    private final PointsHistoryRepository pointsHistoryRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Transactional
    public WalletDto getWallet(String memberId){
        logger.info("member에 맞는 지갑 정보를 가져옵니다.");

        return walletRepository.findOneByMemberId(memberId)
                .map(WalletDto::new)
                .orElseThrow(() -> new NoDataException("없는 정보입니다."));
    }

    @Transactional
    public WalletResponse getMyWallet(){
        logger.info("지갑 정보를 출력합니다.");
        logger.info("회원 정보를 가져옵니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        return new WalletResponse(getWallet(memberId));
    }

    @Transactional
    public ResponseListBody getWalletList(String admin,WalletListRequest req){
        String memberId = "";

        if(admin.equals("admin")){

            if(req.getMemberID() == null || req.getMemberID().equals("")){
                throw new NoMemberException("없는 회원입니다.");
            }

            memberId = req.getMemberID();
            Member member = memberRepository.findOneByMemberId(memberId)
                    .orElseThrow(() -> new NoMemberException("204","없는 회원입니다."));
        }
        else{
            memberId = jwtTokenProvider.getCurrentMemberId()
                    .orElseThrow(() -> new NoMemberException("없는 회원입니다."));
        }

        // pageable 적용
        Pageable pageable = PageRequest.of(
                req.getPageNo(),
                req.getPageSize()
        );

        LocalDateTime startDate = DateUtil.convertToLocalDateTime(req.getStartDate());
        LocalDateTime endDate = DateUtil.convertToLocalDateTime(req.getEndDate());

        // 리스트 반환
        Page<WalletListResponse> list = pointsHistoryRepository.getWalletList(
                memberId,
                startDate,
                endDate,
                pageable
        );

        // Page<WalletListResponse> → List<WalletListResponse> 변환
        List<WalletListResponse> walletList = list.getContent();

        return new ResponseListBody(list.getTotalElements(), walletList);
    }

    @Transactional
    public ResponseDataBody getWalletDetailList(String admin,String historyID){
        WalletListDetailResponse history = new WalletListDetailResponse();
        if(admin.equals("admin")){
            // 리스트 반환
            history = pointsHistoryRepository.getWalletListDetailAdmin(
                    historyID
            );
        }
        else{
            String memberId = jwtTokenProvider.getCurrentMemberId()
                    .orElseThrow(() -> new NoMemberException("없는 회원입니다."));
            // 리스트 반환
            history = pointsHistoryRepository.getWalletListDetail(
                    memberId,
                    historyID
            );
        }


        if(history != null)
            return new ResponseDataBody("조회에 성공했습니다. ",history);
        else
            return new ResponseDataBody("결과가 없습니다.", null);
    }

    // 문자열 → BigDecimal 변환 메서드 (인터페이스 Projection의 String 반환값 처리)
    private BigDecimal convertToBigDecimal(String value) {
        try {
            return value != null ? new BigDecimal(value) : BigDecimal.ZERO;
        } catch (NumberFormatException e) {
            return BigDecimal.ZERO; // 변환 실패 시 기본값 처리
        }
    }

    @Transactional
    public Boolean registerWallet(String memberId){
        logger.info("지갑을 등록합니다.");
        try {
            Wallet wallet = Wallet.builder()
                    .memberId(memberId)
                    .ap(new BigDecimal("0.0"))
                    .lp(new BigDecimal("0.0"))
                    .ak(new BigDecimal("0.0"))
                    .sp(new BigDecimal("0.0"))
                    .abz(new BigDecimal("0.0"))
                    .abzPoint(new BigDecimal("0.0"))
                    .createdId(memberId)
                    .modifiedId(memberId)
                    .build();

            walletRepository.save(wallet);
            logger.info("지갑 생성 완료.");
            return true; // 성공적으로 저장되었을 때 true 반환
        } catch (Exception e) {
            logger.error("지갑 등록 중 에러 발생: ", e); // 에러 로그 출력
            return false; // 에러 발생 시 false 반환
        }

    }

    @Transactional
    public ResponseListBody getWalletList(){
        logger.info("내역 조회를 시작합니다.");
        logger.info("내역 조회용 회원 정보를 가져옵니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));


        return null;
    }

    /// 대리점 신청시 ABZ 전송
    @Transactional
    public ABZPointsHistory saveABZPointsHistory(String myMemberId, String receiverMemberId, String myWalletId, String receiverWalletId,
                                                    BigDecimal abz) {

        // 내 지갑에서 돈 뺴고
        Wallet myWallet = walletRepository.getWalletByWalletId(myWalletId);
        BigDecimal my = myWallet.getAbz().subtract(abz);
        myWallet.setAbz(my);
        myWallet.setModifiedDateTime(LocalDateTime.now());
        myWallet.setModifiedId(myMemberId);
        //walletRepository.save(myWallet);

        // 받는사람 지갑에 돈 넣고
        Wallet rWallet = walletRepository.getWalletByWalletId(receiverWalletId);
        rWallet.setAbz(rWallet.getAbz().add(abz));
        rWallet.setModifiedDateTime(LocalDateTime.now());
        rWallet.setModifiedId(myMemberId);
        //walletRepository.save(rWallet);

        // 거래내역 생성
        ABZPointsHistory abzPointsHistory = new ABZPointsHistory();
        abzPointsHistory.setHistoryId(UUID.randomUUID().toString() );
        abzPointsHistory.setSenderWalletId(myWalletId);
        abzPointsHistory.setReceiverWalletId(receiverWalletId);
        abzPointsHistory.setMessage("ABZ를 전송했습니다.");
        abzPointsHistory.setAbz(abz);
        abzPointsHistory.setSenderAbzBalance(myWallet.getAbz());
        abzPointsHistory.setReceiverAbzBalance(rWallet.getAbz());
        abzPointsHistory.setStatus("C");    // 해당건은 바로 완료
        abzPointsHistory.setType("A");  // 일단 기본
        abzPointsHistory.setCreatedDateTime(LocalDateTime.now());
        abzPointsHistory.setModifiedDateTime(LocalDateTime.now());
        abzPointsHistory.setCreatedId(myMemberId);
        abzPointsHistory.setModifiedId(myMemberId);
        abzPointsHistory.setDeleteYn("N");

        walletRepository.saveAll(List.of(myWallet, rWallet));
        return abzPointsHistoryRepository.save(abzPointsHistory);
    }
}
