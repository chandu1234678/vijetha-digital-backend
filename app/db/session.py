from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings

# 🔒 Single source of truth — Settings
DATABASE_URL = settings.DATABASE_URL

# Optional: keep this ONLY for local debugging
print("DATABASE_URL USED BY SQLALCHEMY:", DATABASE_URL)

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)
