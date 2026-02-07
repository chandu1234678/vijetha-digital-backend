from sqlalchemy import Column, Integer, String, Float
from app.db.base import Base

class Material(Base):
    __tablename__ = "materials"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    rate_per_sqft = Column(Float, nullable=False)
