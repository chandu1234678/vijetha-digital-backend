import razorpay
from app.core.config import settings

client = razorpay.Client(
    auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
)


def create_payment_order(order_id: int, amount: float):
    # Razorpay expects paise
    data = {
        "amount": int(amount * 100),
        "currency": "INR",
        "receipt": f"order_{order_id}",
        "payment_capture": 1,
    }
    return client.order.create(data)
