from sqlalchemy import Column, Integer, String, Boolean, Float
from app.db.base import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    base_price = Column(Float, nullable=False)
    is_active = Column(Boolean, default=True)
