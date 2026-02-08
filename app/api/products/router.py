from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.product import ProductResponse
from app.services.product_service import get_all_products
from app.db.session import get_db

router = APIRouter(prefix="/products", tags=["products"])


@router.get("", response_model=list[ProductResponse])
def list_products(db: Session = Depends(get_db)):
    return get_all_products(db)
