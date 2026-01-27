package com.app.sikka.entity;

import com.app.sikka.entity.enums.CitizenAccountTier;
import com.app.sikka.entity.enums.UserType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_type", nullable = false, length = 20)
    private UserType userType;

    @Column(name = "phone_number", nullable = false, length = 15)
    private String phoneNumber;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(name = "pin_hash", nullable = false)
    private String pinHash;

    @Enumerated
    @ColumnDefault("NULL")
    @Column(name = "account_tier", length = 10)
    private CitizenAccountTier accountTier;

    @Column(name = "citizenship_number", length = 20)
    private String citizenshipNumber;

    @ColumnDefault("false")
    @Column(name = "bank_account_linked")
    private Boolean bankAccountLinked;

    @ColumnDefault("now()")
    @Column(name = "last_sync_at")
    private Instant lastSyncAt;

    @ColumnDefault("0")
    @Column(name = "transaction_nonce")
    private Long transactionNonce;

    @ColumnDefault("true")
    @Column(name = "is_active")
    private Boolean isActive;

    @ColumnDefault("false")
    @Column(name = "is_frozen")
    private Boolean isFrozen;

    @ColumnDefault("now()")
    @Column(name = "created_at")
    private Instant createdAt;

    @ColumnDefault("now()")
    @Column(name = "updated_at")
    private Instant updatedAt;

}