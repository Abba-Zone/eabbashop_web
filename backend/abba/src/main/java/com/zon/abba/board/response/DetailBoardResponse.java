package com.zon.abba.board.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.board.entity.Board;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DetailBoardResponse {
    @JsonProperty("boardID")
    private String boardId;
    @JsonProperty("name")
    private String name;
    @JsonProperty("type")
    private Integer type;
    @JsonProperty("title")
    private String title;
    @JsonProperty("contents")
    private String contents;
    @JsonProperty("showYN")
    private boolean showYN;
    @JsonProperty("topYN")
    private boolean topYN;
    @JsonProperty("createdDateTime")
    private LocalDateTime createdDateTime;

    public DetailBoardResponse(Board board, String name){
        this.boardId = board.getBoardId();
        this.name = name;
        this.type = board.getType();
        this.title = board.getTitle();
        this.contents = board.getContents();
        this.showYN = board.getShowYn().equals("Y");
        this.topYN = board.getTopYn().equals("Y");
        this.createdDateTime = board.getCreatedDateTime();
    }
}
