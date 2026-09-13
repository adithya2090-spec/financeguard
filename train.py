import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib
import os

def generate_training_data(n=5000):
    """Generate synthetic transaction data for training."""
    np.random.seed(42)
    categories = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Healthcare']
    data = []

    for _ in range(n):
        amount = np.random.lognormal(4, 1.5)
        category = np.random.choice(categories)
        hour = np.random.randint(0, 24)
        user_avg = np.random.uniform(50, 300)
        amount_ratio = amount / user_avg

        # Fraud heuristics
        is_fraud = int(
            (amount > 2000 and np.random.random() < 0.8) or
            (hour < 4 and amount > 500 and np.random.random() < 0.6) or
            (amount_ratio > 8 and np.random.random() < 0.7) or
            (np.random.random() < 0.02)  # 2% random fraud baseline
        )

        data.append({
            'amount': amount,
            'category': category,
            'hour': hour,
            'user_avg': user_avg,
            'amount_ratio': amount_ratio,
            'is_fraud': is_fraud
        })

    return pd.DataFrame(data)

def train():
    df = generate_training_data()
    le = LabelEncoder()
    df['category_enc'] = le.fit_transform(df['category'])

    X = df[['amount', 'category_enc', 'hour', 'user_avg', 'amount_ratio']]
    y = df['is_fraud']

    model = RandomForestClassifier(n_estimators=100, random_state=42, class_weight='balanced')
    model.fit(X, y)

    os.makedirs('model', exist_ok=True)
    joblib.dump(model, 'model/fraud_model.pkl')
    joblib.dump(le, 'model/label_encoder.pkl')
    print(f"Model trained. Fraud rate: {y.mean():.2%}")
    return model, le

if __name__ == "__main__":
    train()