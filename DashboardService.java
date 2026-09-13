package com.financeguard.service;

import com.financeguard.model.User;
import com.financeguard.repository.FraudAlertRepository;
import com.financeguard.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final TransactionRepository transactionRepository;
    private final FraudAlertRepository fraudAlertRepository;

    public Map<String, Object> getDashboardSummary(User user) {
        Map<String, Object> summary = new HashMap<>();
        summary.put("name", user.getName());
        summary.put("balance", user.getBalance());
        summary.put("totalTransactions", transactionRepository.countByUser(user));
        
        List<Object[]> spendingData = transactionRepository.findSpendingByCategory(user.getId());
        double totalSpent = spendingData.stream()
            .mapToDouble(row -> ((Number) row[1]).doubleValue())
            .sum();
            
        summary.put("totalSpent", totalSpent);
        summary.put("activeFraudAlerts", fraudAlertRepository.countByUserAndResolvedFalse(user));

        return summary;
    }
}
