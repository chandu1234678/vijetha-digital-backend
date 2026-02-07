from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.auth.dependencies import get_current_user, get_db
from app.services.payment_service import create_payment_order
from app.models.order import Order

router = APIRouter(prefix="/payments", tags=["payments"])


@router.post("/create/{order_id}")
def initiate_payment(
    order_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    order = db.query(Order).filter(Order.id == order_id).first()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    if order.user_email != user["sub"]:
        raise HTTPException(status_code=403, detail="Not your order")

    if order.status != "CREATED":
        raise HTTPException(status_code=400, detail="Order already paid")

    payment = create_payment_order(order.id, order.total_price)

    return {
        "razorpay_order_id": payment["id"],
        "amount": payment["amount"],
        "currency": payment["currency"],
        "key": settings.RAZORPAY_KEY_ID,
    }
