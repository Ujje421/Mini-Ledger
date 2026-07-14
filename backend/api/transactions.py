from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from typing import List, Optional
from datetime import datetime

from database import get_session
from models.transaction import Transaction, TransactionCreate, TransactionRead, TransactionType
from cache import invalidate_summary_cache

router = APIRouter(prefix="/transactions", tags=["transactions"])

@router.post("/", response_model=TransactionRead)
def create_transaction(*, session: Session = Depends(get_session), transaction: TransactionCreate):
    db_transaction = Transaction.model_validate(transaction)
    session.add(db_transaction)
    session.commit()
    session.refresh(db_transaction)
    invalidate_summary_cache()
    return db_transaction

@router.get("/", response_model=List[TransactionRead])
def read_transactions(
    *,
    session: Session = Depends(get_session),
    skip: int = 0,
    limit: int = Query(default=100, le=100),
    type: Optional[TransactionType] = None,
    category: Optional[str] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None
):
    query = select(Transaction)
    if type:
        query = query.where(Transaction.type == type)
    if category:
        query = query.where(Transaction.category == category)
    if start_date:
        query = query.where(Transaction.date >= start_date)
    if end_date:
        query = query.where(Transaction.date <= end_date)
        
    query = query.offset(skip).limit(limit).order_by(Transaction.date.desc())
    transactions = session.exec(query).all()
    return transactions

@router.delete("/{transaction_id}")
def delete_transaction(*, session: Session = Depends(get_session), transaction_id: int):
    transaction = session.get(Transaction, transaction_id)
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    session.delete(transaction)
    session.commit()
    invalidate_summary_cache()
    return {"ok": True}
