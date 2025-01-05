package com.zon.abba.board.controller;

import com.zon.abba.address.controller.AddressController;
import com.zon.abba.address.request.RegisterAddressRequest;
import com.zon.abba.board.request.BoardIdRequest;
import com.zon.abba.board.request.DetailBoardRequest;
import com.zon.abba.board.request.RegisterBoardRequest;
import com.zon.abba.board.response.DetailBoardResponse;
import com.zon.abba.board.service.BoardService;
import com.zon.abba.common.request.RequestList;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseListBody;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {
    private static final Logger logger = LoggerFactory.getLogger(BoardController.class);

    private final BoardService boardService;

    @GetMapping("/list")
    @Operation(description = "board list", summary = "게시판 리스트 반환")
    public ResponseEntity<Object> boardList(@ModelAttribute RequestList requestList,
                                            @RequestParam(value = "type", required = false) Integer type){

        ResponseListBody response = boardService.boardList(requestList, type);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/register")
    @Operation(description = "board register", summary = "게시판 등록")
    public ResponseEntity<Object> registerBoard(@RequestBody RegisterBoardRequest registerBoardRequest){

        ResponseBody response = boardService.registerBoard(registerBoardRequest);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/detail")
    @Operation(description = "board detail", summary = "게시판 상세")
    public ResponseEntity<Object> detailBoard(BoardIdRequest boardIdRequest){

        DetailBoardResponse response = boardService.detailBoard(boardIdRequest);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/update")
    @Operation(description = "board update", summary = "게시판 갱신")
    public ResponseEntity<Object> updateBoard(@RequestBody DetailBoardRequest detailBoardRequest){

        ResponseBody response = boardService.updateBoard(detailBoardRequest);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/delete")
    @Operation(description = "board delete", summary = "게시판 삭제")
    public ResponseEntity<Object> deleteBoard(@RequestBody BoardIdRequest boardIdRequest){

        ResponseBody response = boardService.deleteBoard(boardIdRequest);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


}
