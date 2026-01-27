package com.app.sikka.repository;

import com.app.sikka.entity.GovtBudgetAllocation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface GovtBudgetAllocationRepository extends JpaRepository<GovtBudgetAllocation, UUID> {
}
