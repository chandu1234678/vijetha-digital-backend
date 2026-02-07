from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException

from app.models.pricing import MaterialRate, ExtraRate


def add_material(db: Session, name: str, rate: float):
    material = MaterialRate(
        name=name.lower().strip(),
        rate_per_sqft=rate
    )

    db.add(material)

    try:
        db.commit()
        db.refresh(material)
        return material

    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail=f"Material '{name}' already exists"
        )


def add_extra(db: Session, name: str, price: float):
    extra = ExtraRate(
        name=name.lower().strip(),
        price=price
    )

    db.add(extra)

    try:
        db.commit()
        db.refresh(extra)
        return extra

    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail=f"Extra '{name}' already exists"
        )
