package com.zon.abba.account.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "Accounts")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Accounts {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "AccountID", nullable = false, updatable = false, length = 36)
    private String accountId;

    @Column(name = "MemberID", nullable = false, length = 36)
    private String memberId;

    @Column(name = "Bank", length = 20, nullable = false)
    private String bank;

    @Column(name = "AccountNumber", length = 30, nullable = false)
    private String accountNumber;

    @Column(name = "FirstName", length = 50, nullable = false)
    private String firstName;

    @Column(name = "LastName", length = 50, nullable = false)
    private String lastName;

    @Column(name = "CreatedID", length = 36, nullable = false)
    private String createdId;

    @Column(name = "ModifiedID", length = 36)
    private String modifiedId;

    @Column(name = "IsMain", nullable = false)
    private Boolean isMain;

    @CreationTimestamp
    @Column(name = "CreatedDateTime", updatable = false)
    private LocalDateTime createdDateTime;

    @UpdateTimestamp
    @Column(name = "ModifiedDateTime")
    private LocalDateTime modifiedDateTime;

    @Column(name = "DeleteYN", length = 1, nullable = false)
    private String deleteYn;

    @Column(name = "ActiveYN", length = 1, nullable = false)
    private String activeYn;

    @PrePersist
    public void perPersist(){

        if(this.createdDateTime == null) this.createdDateTime = LocalDateTime.now();
        if(this.modifiedDateTime == null) this.modifiedDateTime = LocalDateTime.now();

        if(this.deleteYn == null) this.deleteYn = "N";
        if(this.activeYn == null) this.activeYn = "Y";
    }
}
