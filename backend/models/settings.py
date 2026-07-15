from sqlmodel import SQLModel, Field
from typing import Optional

class SettingsBase(SQLModel):
    first_name: Optional[str] = Field(default="Ujjwal")
    last_name: Optional[str] = Field(default="Jagtap")
    profession: Optional[str] = Field(default="Software Engineer")
    email: Optional[str] = Field(default="ujjwal@example.com")
    base_currency: Optional[str] = Field(default="USD ($)")
    timezone: Optional[str] = Field(default="UTC (Coordinated Universal Time)")

class Settings(SettingsBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

class SettingsUpdate(SQLModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    profession: Optional[str] = None
    email: Optional[str] = None
    base_currency: Optional[str] = None
    timezone: Optional[str] = None
