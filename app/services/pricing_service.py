from sqlalchemy.orm import Session
from app.models.pricing import MaterialRate, ExtraRate


def calculate_price(
    *,
    db: Session,
    width_ft: float,
    height_ft: float,
    material: str,
    quantity: int,
    lamination: bool = False,
    frame: bool = False,
):
    """
    Production-grade pricing engine
    - Single source of truth: MaterialRate.rate_per_sqft
    - Backend-only price calculation
    - Quantity applied exactly once
    """

    # 1️⃣ Area calculation
    area = width_ft * height_ft

    if area <= 0 or quantity <= 0:
        raise ValueError("Invalid dimensions or quantity")

    # 2️⃣ Fetch material rate
    material_rate = (
        db.query(MaterialRate)
        .filter(MaterialRate.name == material)
        .first()
    )

    if not material_rate:
        raise ValueError("Material rate not configured")

    # 3️⃣ Base unit price
    base_unit_price = area * material_rate.rate_per_sqft

    # 4️⃣ Extras (future-safe)
    extras_unit_price = 0.0

    if lamination:
        extra = (
            db.query(ExtraRate)
            .filter(ExtraRate.name == "lamination")
            .first()
        )
        if extra:
            extras_unit_price += area * extra.rate_per_sqft

    if frame:
        extra = (
            db.query(ExtraRate)
            .filter(ExtraRate.name == "frame")
            .first()
        )
        if extra:
            extras_unit_price += extra.rate_per_sqft

    # 5️⃣ Final prices
    unit_price = base_unit_price + extras_unit_price
    total_price = unit_price * quantity

    return {
        "unit_price": round(unit_price, 2),
        "total_price": round(total_price, 2),
    }
