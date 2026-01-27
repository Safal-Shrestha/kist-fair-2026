package com.app.sikka.repository;

import com.app.sikka.entity.GovernmentProgram;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface GovernmentProgramRepository extends JpaRepository<GovernmentProgram, UUID> {
}
