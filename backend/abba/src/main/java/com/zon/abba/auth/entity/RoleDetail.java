package com.zon.abba.auth.entity;

import com.zon.abba.auth.entity.Auth;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "RoleDetail")
public class RoleDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "RoleDetailID", columnDefinition = "CHAR(36)", nullable = false, updatable = false)
    private String roleDetailId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "RoleID", nullable = false)
    private Role role;  // ✅ 이 필드가 있어야 합니다.

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "AuthID", nullable = false)
    private Auth auth;
}
