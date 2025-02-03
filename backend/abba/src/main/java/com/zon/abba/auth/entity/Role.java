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
@Table(name = "Role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "RoleID", columnDefinition = "CHAR(36)", nullable = false, updatable = false)
    private String roleId;

    @Column(name = "RoleName", length = 100, nullable = false)
    private String roleName;

    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RoleDetail> roleDetails;
}
