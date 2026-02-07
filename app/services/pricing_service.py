from sqlalchemy.orm import Session
from app.models.pricing import MaterialRate, ExtraRate


def calculate_price(db: Session, item):
    # 1. Get material (from material_rates table)
    material = (
        db.query(MaterialRate)
        .filter(MaterialRate.name == item.material.lower())
        .first()
    )

    if not material:
        raise ValueError(f"Invalid material: {item.material}")

    # 2. Base price
    area = item.width_ft * item.height_ft
    unit_price = area * material.rate_per_sqft

    # 3. Extras
    extras_price = 0

    if item.lamination:
        lamination = (
            db.query(ExtraRate)
            .filter(ExtraRate.name == "lamination")
            .first()
        )
        if lamination:
            extras_price += lamination.price

    if item.frame:
        frame = (
            db.query(ExtraRate)
            .filter(ExtraRate.name == "frame")
            .first()
        )
        if frame:
            extras_price += frame.price

    unit_price += extras_price
    total_price = unit_price * item.quantity

    return unit_price, total_price
