from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.auth.dependencies import admin_required
from app.db.session import get_db
from app.schemas.product import ProductCreate, ProductResponse
from app.schemas.admin_pricing import MaterialCreate, ExtraCreate
from app.services.product_service import create_product, delete_product
from app.services.order_service import get_all_orders, update_order_status
from app.services.admin_pricing_service import add_material, add_extra
from app.models.pricing import MaterialRate, ExtraRate

router = APIRouter(prefix="/admin", tags=["admin"])


# ---------- ADMIN DASHBOARD ----------
@router.get("/dashboard")
def admin_dashboard(user=Depends(admin_required)):
    return {
        "message": "Welcome admin",
        "admin": user["sub"],
    }


# ---------- PRODUCT MANAGEMENT ----------
@router.post("/products", response_model=ProductResponse)
def add_product(
    data: ProductCreate,
    db: Session = Depends(get_db),
    user=Depends(admin_required),
):
    return create_product(
        db,
        data.name,
        data.category,
        data.base_price,
    )


@router.delete("/products/{product_id}")
def remove_product(
    product_id: int,
    db: Session = Depends(get_db),
    user=Depends(admin_required),
):
    try:
        delete_product(db, product_id)
        return {"message": "Product deleted"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


# ---------- ORDER MANAGEMENT ----------
@router.get("/orders")
def all_orders(
    db: Session = Depends(get_db),
    user=Depends(admin_required),
):
    return get_all_orders(db)


@router.patch("/orders/{order_id}")
def change_order_status(
    order_id: int,
    status: str,
    db: Session = Depends(get_db),
    user=Depends(admin_required),
):
    try:
        return update_order_status(db, order_id, status)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


# ---------- PRICING MANAGEMENT ----------
@router.post("/materials")
def create_material(
    data: MaterialCreate,
    db: Session = Depends(get_db),
    user=Depends(admin_required),
):
    return add_material(db, data.name, data.rate_per_sqft)


@router.get("/materials")
def list_materials(
    db: Session = Depends(get_db),
    user=Depends(admin_required),
):
    return db.query(MaterialRate).all()


@router.delete("/materials/{material_id}")
def delete_material(
    material_id: int,
    db: Session = Depends(get_db),
    user=Depends(admin_required),
):
    material = db.query(MaterialRate).get(material_id)
    if not material:
        raise HTTPException(status_code=404, detail="Material not found")

    db.delete(material)
    db.commit()
    return {"message": "Deleted"}


@router.post("/extras")
def create_extra(
    data: ExtraCreate,
    db: Session = Depends(get_db),
    user=Depends(admin_required),
):
    return add_extra(db, data.name, data.price)


@router.get("/extras")
def list_extras(
    db: Session = Depends(get_db),
    user=Depends(admin_required),
):
    return db.query(ExtraRate).all()


@router.delete("/extras/{extra_id}")
def delete_extra(
    extra_id: int,
    db: Session = Depends(get_db),
    user=Depends(admin_required),
):
    extra = db.query(ExtraRate).get(extra_id)
    if not extra:
        raise HTTPException(status_code=404, detail="Extra not found")

    db.delete(extra)
    db.commit()
    return {"message": "Deleted"}
