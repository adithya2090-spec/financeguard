package com.financeguard.repository;

import com.financeguard.model.FraudAlert;
import com.financeguard.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FraudAlertRepository extends JpaRepository<FraudAlert, Long> {
    List<FraudAlert> findByUserOrderByCreatedAtDesc(User user);
    long countByUserAndResolvedFalse(User user);
}
