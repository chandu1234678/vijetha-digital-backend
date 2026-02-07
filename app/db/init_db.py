from app.db.session import engine
from app.db.base import Base

from app.models.user import User
from app.models.product import Product
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.material import Material
from app.models.extra import Extra

def init_db():
    Base.metadata.create_all(bind=engine)
