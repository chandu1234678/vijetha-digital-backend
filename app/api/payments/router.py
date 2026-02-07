from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.auth.dependencies import get_current_user, get_db
from app.services.payment_service import create_payment_order

router = APIRouter(prefix="/payments", tags=["payments"])


@router.post("/create/{order_id}")
def initiate_payment(
    order_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return create_payment_order(
        db=db,
        order_id=order_id,
        user_email=user["sub"],
    )
