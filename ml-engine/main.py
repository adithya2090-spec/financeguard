from fastapi import FastAPI
from pydantic import BaseModel
from model.predict import predict_fraud
import uvicorn

app = FastAPI(title="FinanceGuard ML Engine")

class TransactionInput(BaseModel):
    amount: float
    category: str
    merchant: str
    hour_of_day: int
    user_avg_transaction: float

@app.get("/health")
def health():
    return {"status": "ok", "service": "FinanceGuard ML Engine"}

@app.post("/predict")
def predict(transaction: TransactionInput):
    result = predict_fraud(
        amount=transaction.amount,
        category=transaction.category,
        merchant=transaction.merchant,
        hour=transaction.hour_of_day,
        user_avg=transaction.user_avg_transaction
    )
    return result

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)