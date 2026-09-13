package com.financeguard.service;

import com.financeguard.model.Transaction;
import com.financeguard.model.FraudAlert;
import com.financeguard.model.User;
import com.financeguard.repository.TransactionRepository;
import com.financeguard.repository.FraudAlertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final FraudAlertRepository fraudAlertRepository;
    private final RestTemplate restTemplate;

    @Value("${ml.engine.url}")
    private String mlEngineUrl;

    public Transaction createTransaction(Transaction transaction, User user) {
        transaction.setUser(user);

        // Call ML engine for fraud score
        Map<String, Object> payload = new HashMap<>();
        payload.put("amount", transaction.getAmount());
        payload.put("category", transaction.getCategory());
        payload.put("merchant", transaction.getMerchant());
        payload.put("hour_of_day", transaction.getTimestamp().getHour());
        payload.put("user_avg_transaction",
            transactionRepository.findAverageAmountByUser(user.getId()).orElse(100.0));

        try {
            Map response = restTemplate.postForObject(
                mlEngineUrl + "/predict", payload, Map.class);

            double fraudScore = ((Number) response.get("fraud_score")).doubleValue();
            boolean isFraud = (Boolean) response.get("is_fraud");

            transaction.setFraudScore(fraudScore);
            transaction.setIsFraudulent(isFraud);

            Transaction saved = transactionRepository.save(transaction);

            if (isFraud) {
                FraudAlert alert = new FraudAlert();
                alert.setTransaction(saved);
                alert.setUser(user);
                alert.setRiskScore(fraudScore);
                alert.setReason((String) response.get("reason"));
                fraudAlertRepository.save(alert);
            }

            return saved;
        } catch (Exception e) {
            transaction.setFraudScore(0.0);
            transaction.setIsFraudulent(false);
            return transactionRepository.save(transaction);
        }
    }

    public List<Transaction> getUserTransactions(User user) {
        return transactionRepository.findByUserOrderByTimestampDesc(user);
    }

    public Map<String, Double> getSpendingByCategory(User user) {
        List<Object[]> results = transactionRepository.findSpendingByCategory(user.getId());
        Map<String, Double> spending = new LinkedHashMap<>();
        for (Object[] row : results) {
            spending.put((String) row[0], ((Number) row[1]).doubleValue());
        }
        return spending;
    }

    public Map<String, Object> getBudgetRecommendations(User user) {
        Map<String, Double> spending = getSpendingByCategory(user);
        Map<String, Object> recommendations = new LinkedHashMap<>();
        List<String> tips = new ArrayList<>();

        spending.forEach((category, amount) -> {
            if (category.equals("Entertainment") && amount > 200)
                tips.add("Entertainment spend is £" + String.format("%.0f", amount) + " this month. Consider capping at £150.");
            if (category.equals("Food") && amount > 400)
                tips.add("Food spend is £" + String.format("%.0f", amount) + ". Meal prepping could save ~£100/month.");
            if (category.equals("Transport") && amount > 150)
                tips.add("Transport at £" + String.format("%.0f", amount) + ". A monthly pass may be cheaper.");
        });

        if (tips.isEmpty()) tips.add("Your spending looks healthy this month. Keep it up!");

        recommendations.put("spending", spending);
        recommendations.put("tips", tips);
        recommendations.put("total_spent", spending.values().stream().mapToDouble(Double::doubleValue).sum());
        return recommendations;
    }
}