package com.app.sikka.repository;

import com.app.sikka.entity.GovtBudgetAllocation;
import com.app.sikka.entity.SubWalletPersonal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SubWalletPersonalRepository extends JpaRepository<SubWalletPersonal, UUID> {
}
