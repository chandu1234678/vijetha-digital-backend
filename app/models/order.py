from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import relationship
from app.db.base import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, index=True)
    total_price = Column(Float)
    status = Column(String)

    items = relationship("OrderItem", back_populates="order", cascade="all, delete")
