from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.auth import (
    RegisterRequest,
    LoginRequest,
    TokenResponse,
)
from app.services.auth_service import (
    register_user,
    login_user,
)
from app.services.password_reset_service import (
    request_password_reset,
    reset_password,
)

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)


# =========================
# AUTH
# =========================

@router.post("/register")
def register(
    data: RegisterRequest,
    db: Session = Depends(get_db),
):
    """
    Create a new customer account
    Role is enforced inside auth_service
    """
    return register_user(db, data)


@router.post("/login", response_model=TokenResponse)
def login(
    data: LoginRequest,
    db: Session = Depends(get_db),
):
    return login_user(db, data)


# =========================
# PASSWORD RESET
# =========================

@router.post("/forgot-password")
def forgot_password(
    data: dict,
    db: Session = Depends(get_db),
):
    """
    Send password reset email if user exists.
    Always return success (security reason).
    """
    email = data.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")

    request_password_reset(db, email)

    return {
        "message": "If the email exists, a reset link was sent"
    }


@router.post("/reset-password")
def reset_user_password(
    data: dict,
    db: Session = Depends(get_db),
):
    """
    Reset password using token
    """
    token = data.get("token")
    new_password = data.get("new_password")

    if not token or not new_password:
        raise HTTPException(
            status_code=400,
            detail="Token and new_password are required"
        )

    try:
        reset_password(db, token, new_password)
        return {"message": "Password updated successfully"}
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Invalid or expired token"
        )
