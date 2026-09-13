import joblib
import numpy as np
import os

MODEL_PATH = "model/fraud_model.pkl"
ENCODER_PATH = "model/label_encoder.pkl"

# Train on first run if model doesn't exist
if not os.path.exists(MODEL_PATH):
    from model.train import train
    train()

model = joblib.load(MODEL_PATH)
label_encoder = joblib.load(ENCODER_PATH)

CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Healthcare']

def predict_fraud(amount: float, category: str, merchant: str, hour: int, user_avg: float) -> dict:
    if category not in CATEGORIES:
        category = 'Shopping'

    category_enc = label_encoder.transform([category])[0]
    amount_ratio = amount / max(user_avg, 1)

    features = np.array([[amount, category_enc, hour, user_avg, amount_ratio]])
    fraud_score = float(model.predict_proba(features)[0][1])
    is_fraud = fraud_score > 0.5

    # Human-readable reason
    reasons = []
    if amount > 2000:
        reasons.append(f"High transaction amount (£{amount:.0f})")
    if hour < 5:
        reasons.append(f"Unusual transaction time ({hour:02d}:00)")
    if amount_ratio > 5:
        reasons.append(f"Amount is {amount_ratio:.1f}x your average")

    reason = "; ".join(reasons) if reasons else "Anomalous transaction pattern detected"

    return {
        "fraud_score": round(fraud_score, 4),
        "is_fraud": is_fraud,
        "reason": reason,
        "risk_level": "HIGH" if fraud_score > 0.7 else "MEDIUM" if fraud_score > 0.4 else "LOW"
    }