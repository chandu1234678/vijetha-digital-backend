from sqlalchemy.orm import Session
from app.models.pricing import MaterialRate, ExtraRate


def calculate_price(db: Session, item):
    material = (
        db.query(MaterialRate)
        .filter(MaterialRate.name == item.material.lower())
        .first()
    )

    if not material:
        raise ValueError(f"Invalid material: {item.material}")

    area = item.width_ft * item.height_ft
    unit_price = area * material.rate_per_sqft

    extras_price = 0

    if item.lamination:
        extra = db.query(ExtraRate).filter(ExtraRate.name == "lamination").first()
        if extra:
            extras_price += extra.price

    if item.frame:
        extra = db.query(ExtraRate).filter(ExtraRate.name == "frame").first()
        if extra:
            extras_price += extra.price

    unit_price += extras_price
    total_price = unit_price * item.quantity

    return unit_price, total_price
