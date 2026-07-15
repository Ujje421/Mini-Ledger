from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from database import get_session
from models.settings import Settings, SettingsUpdate

router = APIRouter(prefix="/settings", tags=["settings"])

@router.get("/", response_model=Settings)
def get_settings(session: Session = Depends(get_session)):
    settings = session.get(Settings, 1)
    if not settings:
        settings = Settings(id=1)
        session.add(settings)
        session.commit()
        session.refresh(settings)
    return settings

@router.put("/", response_model=Settings)
def update_settings(update_data: SettingsUpdate, session: Session = Depends(get_session)):
    settings = session.get(Settings, 1)
    if not settings:
        settings = Settings(id=1)
        session.add(settings)
        
    for key, value in update_data.model_dump(exclude_unset=True).items():
        setattr(settings, key, value)
        
    session.add(settings)
    session.commit()
    session.refresh(settings)
    return settings
