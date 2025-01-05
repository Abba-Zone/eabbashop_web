package com.zon.abba.board.repository;

import com.zon.abba.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<Board, String> {

    Optional<Board> findByBoardId(String boardId);
}
