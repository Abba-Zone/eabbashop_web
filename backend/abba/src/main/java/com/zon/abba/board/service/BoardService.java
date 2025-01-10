package com.zon.abba.board.service;

import com.zon.abba.board.dto.BoardDto;
import com.zon.abba.board.entity.Board;
import com.zon.abba.board.mapping.BoardList;
import com.zon.abba.board.repository.BoardRepository;
import com.zon.abba.board.request.BoardIdRequest;
import com.zon.abba.board.request.DetailBoardRequest;
import com.zon.abba.board.request.RegisterBoardRequest;
import com.zon.abba.board.response.DetailBoardResponse;
import com.zon.abba.common.exception.NoDataException;
import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.request.RequestList;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.member.entity.Member;
import com.zon.abba.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardService {
    private static final Logger logger = LoggerFactory.getLogger(BoardService.class);

    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public ResponseListBody boardList(RequestList requestList, Integer type){

        logger.info("게시글 리스트를 반환합니다.");
        // pageable 적용
        Pageable pageable = PageRequest.of(
                requestList.getPageNo(),
                requestList.getPageSize()
        );

        // 리스트 반환
        Page<BoardList> list = boardRepository.findBoardsWithFilterAndType(
                requestList.getFilter(),
                requestList.getFilterValue(),
                type,
                pageable
        );

        // 리스트를 dto로 반환
        List<BoardDto> boards = list.stream()
                .map(BoardDto::new) // Board -> BoardDto 변환
                .sorted(Comparator
                        .comparing((BoardDto dto) -> dto.getTopYN() ? 0 : 1) // TopYN이 true인 경우 우선
                        .thenComparing(dto -> dto.getTopYN() ? dto.getCreateDateTime() : null, Comparator.nullsLast(Comparator.reverseOrder())) // TopYN=true인 경우 최신순
                        .thenComparing(BoardDto::getCreateDateTime, Comparator.reverseOrder())) // 나머지는 최신순
                .toList();

        logger.info("게시글 리스트를 반환을 완료합니다.");
        return new ResponseListBody(list.getTotalElements(), boards);
    }

    @Transactional
    public ResponseListBody boardAdminList(RequestList requestList, Integer type){

        logger.info("게시글 관리자용 리스트를 반환합니다.");
        // pageable 적용
        Pageable pageable = PageRequest.of(
                requestList.getPageNo(),
                requestList.getPageSize(),
                Sort.by(requestList.getSort().equals("ASC") ?
                                Sort.Direction.ASC : Sort.Direction.DESC,
                        requestList.getSortValue())
        );

        // 리스트 반환
        Page<BoardList> list = boardRepository.findBoardsWithFilterAndType(
                requestList.getFilter(),
                requestList.getFilterValue(),
                type,
                pageable
        );

        // 리스트를 dto로 반환
        List<BoardDto> boards = list.stream()
                .map(BoardDto::new) // Board -> BoardDto 변환
                .toList();

        logger.info("게시글 관리자용 리스트를 반환을 완료합니다.");
        return new ResponseListBody(list.getTotalElements(), boards);
    }

    @Transactional
    public ResponseBody registerBoard(RegisterBoardRequest registerBoardRequest){
        logger.info("게시물을 등록합니다.");

        logger.info("유저 정보를 가져옵니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        logger.info("게시물 정보를 등록합니다.");
        Board board = Board.builder()
                .memberId(memberId)
                .title(registerBoardRequest.getTitle())
                .contents(registerBoardRequest.getContent())
                .showYn(registerBoardRequest.getShow())
                .topYn(registerBoardRequest.getTop())
                .type(registerBoardRequest.getType())
                .build();

        boardRepository.save(board);

        logger.info("게시물을 등록을 완료했습니다.");
        return new ResponseBody("성공했습니다.");
    }

    @Transactional
    public DetailBoardResponse detailBoard(BoardIdRequest boardIdRequest){

        logger.info("게시글 정보를 가져옵니다.");
        Board board = boardRepository.findByBoardId(boardIdRequest.getBoardID())
                .orElseThrow(() -> new NoDataException("게시글이 없습니다."));

        logger.info("게시글 작성자 정보를 가져옵니다.");
        Member member = memberRepository.findOneByMemberId(board.getMemberId())
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        String name = member.getLastName() + " " + member.getFirstName();

        logger.info("게시글을 반환합니다.");
        return new DetailBoardResponse(board, name);
    }

    @Transactional
    public ResponseBody updateBoard(DetailBoardRequest detailBoardRequest){
        logger.info("업데이트할 게시글 정보를 가져옵니다.");
        Board board = boardRepository.findByBoardId(detailBoardRequest.getBoardId())
                .orElseThrow(() -> new NoDataException("게시글이 없습니다."));

        logger.info("수정 내역을 저장합니다.");
        board.setType(detailBoardRequest.getType());
        board.setTitle(detailBoardRequest.getTitle());
        board.setContents(detailBoardRequest.getContent());
        board.setShowYn(detailBoardRequest.getShow());
        board.setTopYn(detailBoardRequest.getTop());

        boardRepository.save(board);

        logger.info("게시글 업데이트를 완료했습니다.");
        return new ResponseBody("성공했습니다.");
    }

    @Transactional
    public ResponseBody deleteBoard(BoardIdRequest boardIdRequest){
        logger.info("삭제할 게시글 정보를 가져옵니다.");
        Board board = boardRepository.findByBoardId(boardIdRequest.getBoardID())
                .orElseThrow(() -> new NoDataException("게시글이 없습니다."));

        logger.info("삭제를 시도합니다.");
        board.setDeleteYn("Y");
        boardRepository.save(board);

        logger.info("게시글 삭제를 완료했습니다.");
        return new ResponseBody("성공했습니다.");
    }
}
