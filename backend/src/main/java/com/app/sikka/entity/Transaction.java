package com.app.sikka.entity;

import com.app.sikka.entity.enums.TransactionStatus;
import com.app.sikka.entity.enums.TransactionType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "transaction_ref", nullable = false, length = 50)
    private String transactionRef;

    @Column(name = "idempotency_key", nullable = false, length = 100)
    private String idempotencyKey;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_wallet_id")
    private Wallet senderWallet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_user_id")
    private User senderUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_sub_wallet_id")
    private SubWallet senderSubWallet;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "receiver_wallet_id", nullable = false)
    private Wallet receiverWallet;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "receiver_user_id", nullable = false)
    private User receiverUser;

    @Column(name = "amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @ColumnDefault("0.00")
    @Column(name = "fee", precision = 15, scale = 2)
    private BigDecimal fee;

    @Enumerated(EnumType.STRING)
    @Column(name = "transaction_type", nullable = false, length = 30)
    private TransactionType transactionType;

    @Enumerated(EnumType.STRING)
    @ColumnDefault("'PENDING'")
    @Column(name = "status", length = 20)
    private TransactionStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "merchant_id")
    private User merchant;

    @Column(name = "description", length = Integer.MAX_VALUE)
    private String description;

    @Column(name = "sender_signature", length = Integer.MAX_VALUE)
    private String senderSignature;

    @Column(name = "sender_nonce")
    private Long senderNonce;

    @Column(name = "sender_wallet_version")
    private Long senderWalletVersion;

    @ColumnDefault("false")
    @Column(name = "is_offline_transaction")
    private Boolean isOfflineTransaction;

    @Column(name = "offline_created_at")
    private Instant offlineCreatedAt;

    @Column(name = "offline_device_id", length = 100)
    private String offlineDeviceId;

    @Column(name = "synced_at")
    private Instant syncedAt;

    @Column(name = "settlement_time_ms")
    private Integer settlementTimeMs;

    @ColumnDefault("now()")
    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "completed_at")
    private Instant completedAt;

    @Column(name = "receiver_signature", length = Integer.MAX_VALUE)
    private String receiverSignature;

    @ColumnDefault("false")
    @Column(name = "synced_by_sender")
    private Boolean syncedBySender;

    @ColumnDefault("false")
    @Column(name = "synced_by_receiver")
    private Boolean syncedByReceiver;

    @Column(name = "first_sync_at")
    private Instant firstSyncAt;

    @Column(name = "both_synced_at")
    private Instant bothSyncedAt;

    @ColumnDefault("false")
    @Column(name = "sync_conflict")
    private Boolean syncConflict;

}