from sqlalchemy import Column, Integer, String, Float
from app.db.base import Base


class MaterialRate(Base):
    __tablename__ = "material_rates"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    rate_per_sqft = Column(Float, nullable=False)


class ExtraRate(Base):
    __tablename__ = "extra_rates"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    price = Column(Float, nullable=False)
