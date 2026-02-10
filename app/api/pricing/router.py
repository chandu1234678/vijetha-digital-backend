from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.pricing import PriceRequest, PriceResponse
from app.services.pricing_service import calculate_price
from app.db.session import get_db

router = APIRouter(
    prefix="/pricing",
    tags=["pricing"],
)


@router.post("/calculate", response_model=PriceResponse)
def calculate_pricing(
    data: PriceRequest,
    db: Session = Depends(get_db),
):
    """
    Production-grade pricing endpoint

    - Uses MaterialRate as SINGLE source of truth
    - Frontend sends only dimensions & options
    - Backend calculates everything
    """
    try:
        result = calculate_price(
            db=db,
            width_ft=data.width_ft,
            height_ft=data.height_ft,
            material=data.material,
            quantity=data.quantity,
            lamination=data.lamination,
            frame=data.frame,
        )

        return {
            "unit_price": result["unit_price"],
            "total_price": result["total_price"],
        }

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )
