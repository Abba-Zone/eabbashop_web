package com.zon.abba.board.service;

import com.zon.abba.board.entity.Board;
import com.zon.abba.board.repository.BoardRepository;
import com.zon.abba.board.request.BoardIdRequest;
import com.zon.abba.board.request.RegisterBoardRequest;
import com.zon.abba.board.response.DetailBoardResponse;
import com.zon.abba.common.exception.NoDataException;
import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.member.entity.Member;
import com.zon.abba.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardService {
    private static final Logger logger = LoggerFactory.getLogger(BoardService.class);

    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;

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
        Board board = boardRepository.findByBoardId(boardIdRequest.getBoardId())
                .orElseThrow(() -> new NoDataException("게시글이 없습니다."));

        logger.info("게시글 작성자 정보를 가져옵니다.");
        Member member = memberRepository.findOneByMemberId(board.getMemberId())
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        String name = member.getLastName() + " " + member.getFirstName();

        return new DetailBoardResponse(board, name);
    }
}
