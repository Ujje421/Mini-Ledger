from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel

from database import engine
from api import transactions, summary, ask, settings
import models.settings # Ensure table is created

app = FastAPI(title="Smart Mini-Ledger")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

app.include_router(transactions.router)
app.include_router(summary.router)
app.include_router(ask.router)
app.include_router(settings.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Smart Mini-Ledger API"}
