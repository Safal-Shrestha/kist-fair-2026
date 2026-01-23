package com.app.sikka.entity;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

import com.app.sikka.entity.enums.TransactionStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "transactions",  uniqueConstraints = @UniqueConstraint(columnNames = {"sender_id", "nonce"}))
public class Transaction {
    
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private User receiver;

    private BigDecimal amount;

    private long timestamp;

    private String nonce;

    @Column(length = 2048)
    private String signature;

    @Enumerated(EnumType.STRING)
    private TransactionStatus status;

    private Instant createdAt = Instant.now();
}
