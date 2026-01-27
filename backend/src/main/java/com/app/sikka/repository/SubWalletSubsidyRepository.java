package com.app.sikka.repository;

import com.app.sikka.entity.SubWalletSubsidy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SubWalletSubsidyRepository extends JpaRepository<SubWalletSubsidy, UUID> {
}
