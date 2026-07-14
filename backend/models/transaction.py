from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional
from enum import Enum

class TransactionType(str, Enum):
    INCOME = "INCOME"
    EXPENSE = "EXPENSE"

class TransactionBase(SQLModel):
    amount: float
    type: TransactionType
    category: str
    description: Optional[str] = None
    date: datetime

class Transaction(TransactionBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

class TransactionCreate(TransactionBase):
    pass

class TransactionRead(TransactionBase):
    id: int
