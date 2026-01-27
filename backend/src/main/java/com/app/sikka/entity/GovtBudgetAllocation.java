package com.app.sikka.entity;

import com.app.sikka.entity.enums.GovBudgetStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Map;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "govt_budget_allocations")
public class GovtBudgetAllocation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "allocated_gov_dept_id")
    private User allocatedGovDept;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "budget_category")
    private Category budgetCategory;

    @Column(name = "allocated_amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal allocatedAmount;

    @Column(name = "tenure_start", nullable = false)
    private LocalDate tenureStart;

    @Column(name = "tenure_end", nullable = false)
    private LocalDate tenureEnd;

    @Enumerated(EnumType.STRING)
    @ColumnDefault("ACTIVE")
    @Column(name = "status", nullable = false, length = 20)
    private GovBudgetStatus status;

    @ColumnDefault("'{}'")
    @Column(name = "rules", nullable = false)
    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> rules;

    @ColumnDefault("now()")
    @Column(name = "created_at")
    private Instant createdAt;

    @ColumnDefault("now()")
    @Column(name = "updated_at")
    private Instant updatedAt;

    @ColumnDefault("daterange(tenure_start, tenure_end, '[]')")
    @Column(name = "tenure_range", columnDefinition = "daterange")
    private Object tenureRange;

}