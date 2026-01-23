package com.app.sikka.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.sikka.entity.Wallet;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, UUID>{
    
}
