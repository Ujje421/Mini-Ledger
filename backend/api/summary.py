from fastapi import APIRouter, Depends
from sqlmodel import Session, select, func
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

    total_income = session.exec(
        select(func.sum(Transaction.amount))
        .where(Transaction.type == TransactionType.INCOME)
    ).one() or 0
    
    total_expense = session.exec(
        select(func.sum(Transaction.amount))
        .where(Transaction.type == TransactionType.EXPENSE)
    ).one() or 0
    
    category_totals = session.exec(
        select(Transaction.category, func.sum(Transaction.amount))
        .where(Transaction.type == TransactionType.EXPENSE)
        .group_by(Transaction.category)
    ).all()
    
    spend_by_category = {cat: float(amount) for cat, amount in category_totals}
    
    summary = {
        "total_income": float(total_income),
        "total_expense": float(total_expense),
        "net_balance": float(total_income - total_expense),
        "spend_by_category": spend_by_category
    }
    
    try:
        redis_client.setex("summary", 300, json.dumps(summary))
    except Exception:
        pass
        
    return summary
