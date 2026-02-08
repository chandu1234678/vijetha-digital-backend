from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.user import User
from app.services.pricing_service import calculate_price


def create_order(db: Session, user_email: str, items):
    order = Order(
        user_email=user_email,
        status="pending",
        total_price=0,
    )
    db.add(order)
    db.commit()
    db.refresh(order)

    total = 0

    for item in items:
        unit_price, item_total = calculate_price(db, item)

        order_item = OrderItem(
            order_id=order.id,
            width_ft=item.width_ft,
            height_ft=item.height_ft,
            material=item.material,
            quantity=item.quantity,
            unit_price=unit_price,
            total_price=item_total,
        )

        db.add(order_item)
        total += item_total

    order.total_price = total
    db.commit()
    db.refresh(order)
    return order


def get_user_orders(db: Session, user_email: str):
    return (
        db.query(Order)
        .filter(Order.user_email == user_email)
        .all()
    )


# ✅ REQUIRED BY ADMIN ROUTER
def get_all_orders(db: Session):
    return db.query(Order).all()


# ✅ REQUIRED BY ADMIN ROUTER
def update_order_status(db: Session, order_id: int, status: str):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    order.status = status
    db.commit()
    db.refresh(order)
    return order
