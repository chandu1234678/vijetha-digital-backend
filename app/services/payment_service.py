import razorpay
from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.core.config import settings
from app.models.order import Order

client = razorpay.Client(
    auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
)


def create_payment_order(
    db: Session,
    order_id: int,
    user_email: str,
):
    order = (
        db.query(Order)
        .filter(Order.id == order_id, Order.user_email == user_email)
        .first()
    )

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    if order.status == "paid":
        raise HTTPException(status_code=400, detail="Order already paid")

    razorpay_order = client.order.create({
        "amount": int(order.total_price * 100),
        "currency": "INR",
        "receipt": f"order_{order.id}",
        "payment_capture": 1,
    })

    order.status = "paid"
    db.commit()
    db.refresh(order)

    return {
        "order_id": order.id,
        "razorpay_order_id": razorpay_order["id"],
        "amount": order.total_price,
        "currency": "INR",
        "status": order.status,
        "key": settings.RAZORPAY_KEY_ID,
    }
