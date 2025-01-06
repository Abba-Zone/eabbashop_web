package com.zon.abba.category.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Category")
@Data
@Builder
public class Category {

    @Id
    @Column(name = "CategoryID", nullable = false, length = 36)
    private String categoryId;

    @Column(name = "Name", nullable = false, length = 255)
    private String name;

    @Column(name = "ParentID", length = 36)
    private String parentId;

    @Column(name = "Sorting")
    private Integer sorting;

    @Column(name = "CreatedID", nullable = false, length = 36)
    private String createdId;

    @Column(name = "ModifiedID", length = 36)
    private String modifiedId;

    @Column(name = "CreatedDateTime", nullable = false, updatable = false)
    private LocalDateTime createdDateTime;

    @Column(name = "ModifiedDateTime")
    private LocalDateTime modifiedDateTime;

    @Column(name = "DeleteYN", nullable = false, length = 1)
    private String deleteYN;

    @PrePersist
    protected void onCreate() {
        this.createdDateTime = LocalDateTime.now();
        this.modifiedDateTime = LocalDateTime.now();
        this.deleteYN = "N"; // Default value for DeleteYN
    }

    @PreUpdate
    protected void onUpdate() {
        this.modifiedDateTime = LocalDateTime.now();
    }
}
