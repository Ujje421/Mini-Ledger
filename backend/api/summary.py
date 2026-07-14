from fastapi import APIRouter, Depends
from sqlmodel import Session, select
import json

from database import get_session
from models.transaction import Transaction, TransactionType
from cache import redis_client

router = APIRouter(prefix="/summary", tags=["summary"])

@router.get("/")
def get_summary(session: Session = Depends(get_session)):
    try:
        cached = redis_client.get("summary")
        if cached:
            return json.loads(cached)
    except Exception:
        pass # Fallback if redis is down

    transactions = session.exec(select(Transaction)).all()
    
    total_income = sum(t.amount for t in transactions if t.type == TransactionType.INCOME)
    total_expense = sum(t.amount for t in transactions if t.type == TransactionType.EXPENSE)
    
    spend_by_category = {}
    for t in transactions:
        if t.type == TransactionType.EXPENSE:
            spend_by_category[t.category] = spend_by_category.get(t.category, 0) + t.amount
            
    summary = {
        "total_income": total_income,
        "total_expense": total_expense,
        "net_balance": total_income - total_expense,
        "spend_by_category": spend_by_category
    }
    
    try:
        redis_client.setex("summary", 300, json.dumps(summary))
    except Exception:
        pass
        
    return summary
