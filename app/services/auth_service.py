from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.user import User
from app.schemas.auth import RegisterRequest, LoginRequest
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
)
from app.core.config import settings


def register_user(db: Session, data: RegisterRequest):
    # normalize email
    email = data.email.strip().lower()

    # check existing user
    existing = db.query(User).filter(User.email == email).first()
    if existing:
        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    # 🔒 STRICT admin rule (ONE EMAIL ONLY)
    if email == settings.ADMIN_EMAIL.strip().lower():
        role = "admin"
    else:
        role = "customer"

    user = User(
        email=email,
        password=hash_password(data.password),
        role=role,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {"message": "User registered successfully"}


def login_user(db: Session, data: LoginRequest):
    email = data.email.strip().lower()

    user = db.query(User).filter(User.email == email).first()

    if not user or not verify_password(data.password, user.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    access_token = create_access_token(
        {
            "sub": user.email,
            "role": user.role,
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }
