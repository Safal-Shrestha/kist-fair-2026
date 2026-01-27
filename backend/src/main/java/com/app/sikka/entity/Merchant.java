package com.app.sikka.entity;

import com.app.sikka.entity.enums.MerchantSize;
import com.app.sikka.entity.enums.MerchantVerificationStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "merchants")
public class Merchant {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "wallet_id", nullable = false)
    private Wallet wallet;

    @Column(name = "business_name", nullable = false, length = 150)
    private String businessName;

    @Column(name = "merchant_code", nullable = false, length = 20)
    private String merchantCode;

    @Enumerated(EnumType.STRING)
    @ColumnDefault("'SMALL'")
    @Column(name = "merchant_size", length = 20)
    private MerchantSize merchantSize;

    @Column(name = "address", nullable = false, length = Integer.MAX_VALUE)
    private String address;

    @Column(name = "district", length = 50)
    private String district;

    @Enumerated(EnumType.STRING)
    @ColumnDefault("'PENDING'")
    @Column(name = "verification_status", length = 20)
    private MerchantVerificationStatus verificationStatus;

    @ColumnDefault("0.00")
    @Column(name = "total_sales", precision = 15, scale = 2)
    private BigDecimal totalSales;

    @ColumnDefault("0")
    @Column(name = "total_transactions")
    private Integer totalTransactions;

    @ColumnDefault("true")
    @Column(name = "is_active")
    private Boolean isActive;

    @ColumnDefault("now()")
    @Column(name = "created_at")
    private Instant createdAt;

    @ColumnDefault("now()")
    @Column(name = "updated_at")
    private Instant updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "merchant_category")
    private Category merchantCategory;

}