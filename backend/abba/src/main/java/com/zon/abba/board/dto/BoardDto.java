package com.zon.abba.board.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.board.mapping.BoardList;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BoardDto {
    @JsonProperty("boardID")
    private String boardId;
    @JsonProperty("title")
    private String title;
    @JsonProperty("contents")
    private String contents;
    @JsonProperty("name")
    private String name;
    @JsonProperty("showYN")
    private Boolean showYN;
    @JsonProperty("topYN")
    private Boolean topYN;
    @JsonProperty("createDateTime")
    private LocalDateTime createDateTime;

    public BoardDto(BoardList boardList){
        this.boardId = boardList.getBoardId();
        this.title = boardList.getTitle();
        this.contents = boardList.getContents();
        this.name = boardList.getName();
        this.showYN = boardList.getShowYN().equals("Y");
        this.topYN = boardList.getTopYN().equals("Y");
        this.createDateTime = boardList.getCreatedDateTime();
    }
}
