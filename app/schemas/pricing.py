from pydantic import BaseModel


class PriceRequest(BaseModel):
    width_ft: float
    height_ft: float
    material: str
    quantity: int
    lamination: bool = False
    frame: bool = False


class PriceResponse(BaseModel):
    unit_price: float
    total_price: float
