package com.financeguard.repository;

import com.financeguard.model.Transaction;
import com.financeguard.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByUserOrderByTimestampDesc(User user);

    @Query("SELECT AVG(t.amount) FROM Transaction t WHERE t.user.id = :userId")
    Optional<Double> findAverageAmountByUser(Long userId);

    @Query("SELECT t.category, SUM(t.amount) FROM Transaction t WHERE t.user.id = :userId GROUP BY t.category ORDER BY SUM(t.amount) DESC")
    List<Object[]> findSpendingByCategory(Long userId);

    long countByUser(User user);
}
