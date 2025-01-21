package com.zon.abba.board.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Board")
@Data
@Builder
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "BoardID", columnDefinition = "CHAR(36)", nullable = false, updatable = false)
    private String boardId;

    @Column(name = "MemberID", length = 36, nullable = false)
    private String memberId;

    @Column(name = "Title", length = 100, nullable = false)
    private String title;

    @Column(name = "Contents", columnDefinition = "TEXT", nullable = false)
    private String contents;

    @Column(name = "ShowYN", length = 1, nullable = false, columnDefinition = "CHAR(1) DEFAULT 'N'")
    private String showYn;

    @Column(name = "TopYN", length = 1, nullable = false, columnDefinition = "CHAR(1) DEFAULT 'N'")
    private String topYn;

    @Column(name = "Type", nullable = false, columnDefinition = "INT DEFAULT 100")
    private Integer type;

    @Column(name = "CreatedID", length = 36, nullable = false)
    private String createdId;

    @Column(name = "ModifiedID", length = 36, nullable = false)
    private String modifiedId;

    @CreationTimestamp
    @Column(name = "CreatedDateTime", nullable = false, updatable = false)
    private LocalDateTime createdDateTime;

    @UpdateTimestamp
    @Column(name = "ModifiedDateTime", nullable = false)
    private LocalDateTime modifiedDateTime;

    @Column(name = "DeleteYN", length = 1, nullable = false, columnDefinition = "CHAR(1) DEFAULT 'N'")
    private String deleteYn;

    @PrePersist
    public void perPersist(){

        if(this.createdDateTime == null) this.createdDateTime = LocalDateTime.now();
        if(this.modifiedDateTime == null) this.modifiedDateTime = LocalDateTime.now();

        if(this.deleteYn == null) this.deleteYn = "N";
    }

}
