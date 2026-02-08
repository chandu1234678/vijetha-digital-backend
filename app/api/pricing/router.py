from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.pricing import PriceRequest, PriceResponse
from app.services.pricing_service import calculate_price
from app.db.session import get_db

router = APIRouter(prefix="/pricing", tags=["pricing"])


@router.post("/calculate", response_model=PriceResponse)
def calculate(data: PriceRequest, db: Session = Depends(get_db)):
    try:
        unit_price, total_price = calculate_price(db, data)
        return {
            "unit_price": unit_price,
            "total_price": total_price,
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
