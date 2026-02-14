from datetime import datetime, timedelta
import secrets
import hashlib
import os
from sqlalchemy.orm import Session

from app.models.user import User
from app.services.email_service import send_email
from app.core.security import hash_password


def _hash_token(token: str) -> str:
    """
    Hash reset token using SHA256 before storing.
    """
    return hashlib.sha256(token.encode()).hexdigest()


def request_password_reset(db: Session, email: str):
    print("🔐 Password reset requested for:", email)

    user = db.query(User).filter(User.email == email).first()
    if not user:
        print("User not found (silent fail)")
        return  # security: do not reveal existence

    # Generate raw token (this goes to email)
    raw_token = secrets.token_urlsafe(32)

    # Store hashed version in DB
    user.reset_token = _hash_token(raw_token)
    user.reset_token_expiry = datetime.utcnow() + timedelta(minutes=30)

    db.commit()

    # Load FRONTEND_URL at runtime (safer)
    FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

    reset_link = f"{FRONTEND_URL}/reset-password?token={raw_token}"

    print("Sending reset email to:", user.email)

    send_email(
        to_email=user.email,
        subject="Reset your Vijetha Digital password",
        html_content=f"""
        <p>You requested a password reset.</p>
        <p>
          <a href="{reset_link}">
            Click here to reset your password
          </a>
        </p>
        <p>This link expires in 30 minutes.</p>
        """
    )

    print("✅ Password reset email flow completed")


def reset_password(db: Session, token: str, new_password: str):
    print("🔁 Reset password attempt")

    hashed_token = _hash_token(token)

    user = db.query(User).filter(
        User.reset_token == hashed_token,
        User.reset_token_expiry > datetime.utcnow()
    ).first()

    if not user:
        print("Invalid or expired token")
        raise ValueError("Invalid or expired token")

    user.password = hash_password(new_password)
    user.reset_token = None
    user.reset_token_expiry = None

    db.commit()

    print("✅ Password successfully updated")
