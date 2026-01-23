package com.app.sikka.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.sikka.entity.FraudLog;

@Repository
public interface FraudLogRepository extends JpaRepository<FraudLog, UUID>{
    
}
