from pydantic import BaseModel


class MaterialCreate(BaseModel):
    name: str
    rate_per_sqft: float


class ExtraCreate(BaseModel):
    name: str
    price: float
