from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.order import Order
from app.models.order_item import OrderItem
from app.services.pricing_service import calculate_price


# ---------------- CREATE ORDER ----------------
def create_order(db: Session, user_email: str, items):
    """
    Create order for logged-in user (email-based ownership)
    Initial status must ALWAYS be payment_initiated
    """

    order = Order(
        user_email=user_email,
        status="payment_initiated",
        total_price=0,
    )

    db.add(order)
    db.flush()  # get order.id without commit

    grand_total = 0.0

    for item in items:
        price = calculate_price(
            db=db,
            width_ft=item.width_ft,
            height_ft=item.height_ft,
            material=item.material,
            quantity=item.quantity,
            lamination=item.lamination,
            frame=item.frame,
        )

        order_item = OrderItem(
            order_id=order.id,
            width_ft=item.width_ft,
            height_ft=item.height_ft,
            material=item.material,
            quantity=item.quantity,
            unit_price=price["unit_price"],
            total_price=price["total_price"],
        )

        db.add(order_item)
        grand_total += price["total_price"]

    order.total_price = round(grand_total, 2)

    db.commit()
    db.refresh(order)
    return order


# ---------------- USER ORDERS ----------------
def get_user_orders(db: Session, user_email: str):
    return (
        db.query(Order)
        .filter(Order.user_email == user_email)
        .order_by(Order.id.desc())
        .all()
    )


# ---------------- ADMIN ORDERS ----------------
def get_all_orders(db: Session):
    return db.query(Order).order_by(Order.id.desc()).all()


# ---------------- SAFE STATUS UPDATE (CRITICAL FIX) ----------------
def update_order_status(db: Session, order_id: int, new_status: str):
    order = db.query(Order).filter(Order.id == order_id).first()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    # 🔒 ALLOWED STATE TRANSITIONS (DO NOT RELAX THIS)
    allowed_transitions = {
        "payment_initiated": ["paid", "cancelled"],
        "paid": ["completed"],
        "completed": [],
        "cancelled": [],
    }

    current_status = order.status

    if new_status not in allowed_transitions.get(current_status, []):
        raise HTTPException(
            status_code=400,
            detail=f"Invalid status transition: {current_status} → {new_status}",
        )

    order.status = new_status
    db.commit()
    db.refresh(order)
    return order
