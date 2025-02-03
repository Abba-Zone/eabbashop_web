package com.zon.abba.auth.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "Auth")
public class Auth {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "AuthID", columnDefinition = "CHAR(36)", nullable = false, updatable = false)
    private String authId;

    @Column(name = "AuthName", length = 100, nullable = false)
    private String authName;

    @Column(name = "Path", length = 100, nullable = false)
    private String path;

    @Column(name = "ViewMenuYN", length = 1, nullable = false, columnDefinition = "CHAR(1) DEFAULT 'Y'")
    private String viewMenuYn;

    @Column(name = "ParentMenuID", columnDefinition = "CHAR(36)")
    private String parentMenuId;

    @Column(name = "UseYN", length = 1, nullable = false, columnDefinition = "CHAR(1) DEFAULT 'Y'")
    private String useYn;

    @Column(name = "Grade", nullable = false, columnDefinition = "INT DEFAULT 1")
    private Integer grade;

    // RoleDetail과의 관계 설정 (1:N) 필요할때만 가져오도록
    @OneToMany(mappedBy = "auth", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<RoleDetail> roleDetails;

    @PrePersist
    public void prePersist() {
        if (this.viewMenuYn == null) this.viewMenuYn = "Y";
        if (this.useYn == null) this.useYn = "Y";
        if (this.grade == null) this.grade = 1;
    }
}
