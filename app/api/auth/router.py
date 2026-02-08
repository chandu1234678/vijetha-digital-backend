from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.schemas.auth import RegisterRequest, LoginRequest, TokenResponse
from app.services.auth_service import register_user, login_user
from app.api.auth.dependencies import get_db

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register")
def register(
    data: RegisterRequest,
    db: Session = Depends(get_db),
):
    try:
        register_user(db, data.email, data.password)
        return {"message": "User registered"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login", response_model=TokenResponse)
def login(
    data: LoginRequest,
    db: Session = Depends(get_db),
):
    try:
        token = login_user(db, data.email, data.password)
        return {"access_token": token}
    except ValueError as e:
        raise HTTPException(status_code=401, detail=str(e))
