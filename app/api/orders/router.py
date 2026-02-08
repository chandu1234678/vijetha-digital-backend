from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session

from app.schemas.order import OrderCreate, OrderResponse
from app.services.order_service import create_order, get_user_orders
from app.services.upload_service import upload_file
from app.api.auth.dependencies import get_current_user, get_db

router = APIRouter(prefix="/orders", tags=["orders"])


@router.post("", response_model=OrderResponse)
def place_order(
    data: OrderCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return create_order(db, user["sub"], data.items)


@router.get("", response_model=list[OrderResponse])
def my_orders(
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return get_user_orders(db, user["sub"])


@router.post("/{order_id}/upload")
def upload_print_file(
    order_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    url = upload_file(file.file)
    return {"file_url": url}
