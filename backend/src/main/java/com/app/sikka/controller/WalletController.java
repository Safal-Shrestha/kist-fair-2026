package com.app.sikka.controller;

import java.util.Optional;
import java.util.UUID;

import com.app.sikka.entity.Wallet;
import com.app.sikka.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/wallet")
public class WalletController {
    
    @Autowired
    WalletRepository walletRepository;

    // wallet by walletId
    @GetMapping("/{walletId}")
    public Optional<Wallet> getWallet(@PathVariable UUID walletId) {
        return walletRepository.findById(walletId);
    }
}
