from sqlalchemy.orm import Session
from app.models.user import User
from app.core.security import hash_password, verify_password, create_access_token
from app.core.config import settings


def register_user(db: Session, email: str, password: str):
    existing = db.query(User).filter(User.email == email).first()
    if existing:
        raise ValueError("User already exists")

    role = "admin" if email == settings.ADMIN_EMAIL else "customer"

    user = User(
        email=email,
        password=hash_password(password),
        role=role,
    )

    db.add(user)
    db.commit()


def login_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password):
        raise ValueError("Invalid credentials")

    token = create_access_token(
        {"sub": user.email, "role": user.role}
    )
    return token
