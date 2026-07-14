import os
from sqlmodel import create_engine, Session

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:password@localhost:5432/miniledger")

engine = create_engine(DATABASE_URL)

def get_session():
    with Session(engine) as session:
        yield session
