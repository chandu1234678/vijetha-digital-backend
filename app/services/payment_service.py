import razorpay
from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.core.config import settings
from app.models.order import Order

client = razorpay.Client(
    auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
)

MIN_RAZORPAY_AMOUNT = 1  # INR


def create_payment_order(
    db: Session,
    order_id: int,
    user_email: str,
):
    # 1️⃣ Fetch order
    order = (
        db.query(Order)
        .filter(
            Order.id == order_id,
            Order.user_email == user_email,
        )
        .first()
    )

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    # 2️⃣ Validate state
    if order.status == "paid":
        raise HTTPException(status_code=400, detail="Order already paid")

    if order.total_price < MIN_RAZORPAY_AMOUNT:
        raise HTTPException(
            status_code=400,
            detail="Order amount too low for payment",
        )

    # 3️⃣ Create Razorpay order
    try:
        razorpay_order = client.order.create({
            "amount": int(order.total_price * 100),  # paise
            "currency": "INR",
            "receipt": f"order_{order.id}",
            "payment_capture": 1,
        })
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=f"Payment gateway error: {str(e)}",
        )

    # 4️⃣ Update order status
    order.status = "payment_initiated"
    db.commit()
    db.refresh(order)

    # 5️⃣ Frontend payload
    return {
        "order_id": order.id,
        "razorpay_order_id": razorpay_order["id"],
        "amount": int(order.total_price * 100),  # paise
        "currency": "INR",
        "key": settings.RAZORPAY_KEY_ID,
    }
