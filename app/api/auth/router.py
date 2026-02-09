from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.auth import RegisterRequest, LoginRequest, TokenResponse
from app.services.auth_service import register_user, login_user
from app.db.session import get_db

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register")
def register(
    data: RegisterRequest,
    db: Session = Depends(get_db),
):
    return register_user(db, data)


@router.post("/login", response_model=TokenResponse)
def login(
    data: LoginRequest,
    db: Session = Depends(get_db),
):
    return login_user(db, data)
