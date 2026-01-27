package com.app.sikka.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Map;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "sub_wallet_subsidy")
public class SubWalletSubsidy {
    @Id
    @Column(name = "id", nullable = false)
    private UUID id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id", nullable = false)
    private SubWallet subWallets;

    @Column(name = "initial_balance", precision = 15, scale = 2)
    private BigDecimal initialBalance;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "program_id")
    private GovernmentProgram program;

    @ColumnDefault("'{}'")
    @Column(name = "restrictions", nullable = false)
    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> restrictions;

    @Column(name = "expires_at")
    private Instant expiresAt;

}