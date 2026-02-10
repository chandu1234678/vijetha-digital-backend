from sqlalchemy.orm import Session

from app.models.order import Order
from app.models.order_item import OrderItem
from app.services.pricing_service import calculate_price


def create_order(db: Session, user_email: str, items):
    """
    Create order for logged-in user (email-based ownership)
    """

    order = Order(
        user_email=user_email,
        status="payment_initiated",
        total_price=0,
    )

    db.add(order)
    db.flush()  # get order.id

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

        # ⚠️ IMPORTANT:
        # OrderItem does NOT have lamination / frame columns
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


def get_user_orders(db: Session, user_email: str):
    return (
        db.query(Order)
        .filter(Order.user_email == user_email)
        .order_by(Order.id.desc())
        .all()
    )


def get_all_orders(db: Session):
    return db.query(Order).order_by(Order.id.desc()).all()


def update_order_status(db: Session, order_id: int, status: str):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        return None

    order.status = status
    db.commit()
    db.refresh(order)
    return order
