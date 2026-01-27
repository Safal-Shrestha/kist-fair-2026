package com.app.sikka.repository;

import com.app.sikka.entity.GovtBudgetAllocation;
import com.app.sikka.entity.Merchant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MerchantRepository extends JpaRepository<Merchant, UUID> {
}
