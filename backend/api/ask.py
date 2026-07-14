from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from pydantic import BaseModel
import os
import google.generativeai as genai
import json

from database import get_session
from models.transaction import Transaction

router = APIRouter(prefix="/ask", tags=["ask"])

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

class AskRequest(BaseModel):
    question: str

class AskResponse(BaseModel):
    answer: str
    data_used: list

@router.post("/", response_model=AskResponse)
def ask_ledger(request: AskRequest, session: Session = Depends(get_session)):
    if not api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY not configured on server")
        
    question = request.question
    
    # 1. RAG Scope: Retrieve all transactions for simplicity, but could filter by dates
    # To keep it grounded and avoid dumping too much data, let's format it compactly.
    transactions = session.exec(select(Transaction).order_by(Transaction.date.desc())).all()
    
    if not transactions:
        return AskResponse(
            answer="I don't have any transaction data to analyze yet.",
            data_used=[]
        )
    
    # Create compact representation
    compact_txs = []
    for t in transactions:
        compact_txs.append({
            "date": t.date.strftime("%Y-%m-%d"),
            "type": t.type.value,
            "category": t.category,
            "amount": t.amount
        })
        
    prompt = f"""
    You are a helpful personal finance AI assistant.
    The user asked: "{question}"
    
    Here is their transaction data in JSON format:
    {json.dumps(compact_txs)}
    
    Answer the user's question accurately based ONLY on this data. Do not make up any numbers.
    If the data does not contain the answer (e.g. asking for a category that doesn't exist), say so clearly.
    Keep the answer concise and professional.
    """
    
    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(prompt)
        answer = response.text
    except Exception as e:
        print("Gemini API Error:", e)
        raise HTTPException(status_code=500, detail="Failed to get response from AI")
        
    return AskResponse(
        answer=answer,
        data_used=compact_txs
    )
