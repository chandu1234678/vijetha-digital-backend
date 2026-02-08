from pydantic import BaseModel
from typing import List, Optional


class OrderItemCreate(BaseModel):
    width_ft: float
    height_ft: float
    material: str
    quantity: int
    lamination: bool = False
    frame: bool = False


class OrderCreate(BaseModel):
    items: List[OrderItemCreate]


class OrderItemResponse(BaseModel):
    width_ft: float
    height_ft: float
    material: str
    quantity: int
    unit_price: float
    total_price: float


class OrderResponse(BaseModel):
    id: int
    user_email: str
    total_price: float
    status: str
    items: List[OrderItemResponse]

    class Config:
        from_attributes = True
