package com.app.sikka.entity;

import com.app.sikka.entity.enums.GovernmentProgramStatus;
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
import java.time.LocalDate;
import java.util.Map;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "government_programs")
public class GovernmentProgram {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "program_name", nullable = false, length = 200)
    private String programName;

    @Column(name = "program_code", nullable = false, length = 50)
    private String programCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_user_id")
    private User departmentUser;

    @Column(name = "total_budget", nullable = false, precision = 15, scale = 2)
    private BigDecimal totalBudget;

    @ColumnDefault("0.00")
    @Column(name = "spent_amount", precision = 15, scale = 2)
    private BigDecimal spentAmount;

    @Column(name = "amount_per_beneficiary", nullable = false, precision = 15, scale = 2)
    private BigDecimal amountPerBeneficiary;

    @ColumnDefault("'{}'")
    @Column(name = "program_rules", nullable = false)
    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> programRules;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    @ColumnDefault("'DRAFT'")
    @Column(name = "status", length = 20)
    private GovernmentProgramStatus status;

    @ColumnDefault("now()")
    @Column(name = "created_at")
    private Instant createdAt;

    @ColumnDefault("now()")
    @Column(name = "updated_at")
    private Instant updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "program_category")
    private Category programCategory;

}