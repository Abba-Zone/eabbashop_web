package com.zon.abba.board.repository;

import com.zon.abba.board.entity.Board;
import com.zon.abba.board.mapping.BoardList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<Board, String> {

    Optional<Board> findByBoardId(String boardId);

    @Query(value = """
        SELECT b.BoardID AS boardId, b.Title AS title, b.Contents AS contents, CONCAT(m.LastName, ' ', m.FirstName) AS name,
        b.ShowYN AS showYN, b.TopYN AS topYN, b.CreatedDateTime AS createdDateTime
        FROM Board b
        LEFT JOIN Members m ON b.MemberID = m.MemberID
        WHERE b.DeleteYN = 'N' AND b.ShowYN = 'Y'
        AND (:type IS NULL OR b.Type = :type)
        AND (:filter IS NULL OR
             (:filter = 'title' AND b.Title LIKE %:filterValue%) OR
             (:filter = 'name' AND CONCAT(m.LastName, ' ', m.FirstName) LIKE %:filterValue%))
    """,
            countQuery = """
        SELECT COUNT(*)
        FROM Board b
        LEFT JOIN Members m ON b.MemberID = m.MemberID
        WHERE b.DeleteYN = 'N' AND b.ShowYN = 'Y'
        AND (:type IS NULL OR b.Type = :type)
        AND (:filter IS NULL OR
             (:filter = 'title' AND b.Title LIKE %:filterValue%) OR
             (:filter = 'name' AND CONCAT(m.LastName, ' ', m.FirstName) LIKE %:filterValue%))
    """,
            nativeQuery = true)
    Page<BoardList> findBoardsWithFilterAndType(
            @Param("filter") String filter,
            @Param("filterValue") String filterValue,
            @Param("type") Integer type,
            Pageable pageable);
}
