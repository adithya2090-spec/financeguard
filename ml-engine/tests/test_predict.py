import pytest
from model.predict import predict_fraud

def test_normal_transaction_is_not_fraud():
    result = predict_fraud(amount=45.0, category="Food",
                          merchant="Tesco", hour=14, user_avg=100.0)
    assert result["is_fraud"] == False
    assert result["fraud_score"] < 0.5

def test_high_amount_flagged():
    result = predict_fraud(amount=5000.0, category="Shopping",
                          merchant="Unknown", hour=3, user_avg=80.0)
    assert result["fraud_score"] > 0.5
    assert result["is_fraud"] == True

def test_response_has_required_fields():
    result = predict_fraud(amount=100.0, category="Bills",
                          merchant="BT", hour=10, user_avg=120.0)
    assert "fraud_score" in result
    assert "is_fraud" in result
    assert "reason" in result
    assert "risk_level" in result

def test_risk_levels():
    low = predict_fraud(50.0, "Food", "Cafe", 12, 100.0)
    assert low["risk_level"] in ["LOW", "MEDIUM", "HIGH"]