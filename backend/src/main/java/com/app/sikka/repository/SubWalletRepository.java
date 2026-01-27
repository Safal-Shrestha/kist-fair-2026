package com.app.sikka.repository;

import com.app.sikka.entity.GovtBudgetAllocation;
import com.app.sikka.entity.SubWallet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SubWalletRepository extends JpaRepository<SubWallet, UUID> {
}
