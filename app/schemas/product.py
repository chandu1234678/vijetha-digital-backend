from pydantic import BaseModel


class ProductCreate(BaseModel):
    name: str
    category: str
    base_price: float


class ProductResponse(BaseModel):
    id: int
    name: str
    category: str
    base_price: float
    is_active: bool

    class Config:
        from_attributes = True
