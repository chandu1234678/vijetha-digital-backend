from sqlalchemy import Column, Integer, Float, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))

    width_ft = Column(Float)
    height_ft = Column(Float)
    material = Column(String)
    quantity = Column(Integer)

    unit_price = Column(Float)
    total_price = Column(Float)

    order = relationship("Order", back_populates="items")
