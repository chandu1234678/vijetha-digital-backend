from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(dotenv_path=BASE_DIR / ".env")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from slowapi import _rate_limit_exceeded_handler

from app.core.config import settings
from app.core.rate_limiter import limiter
from app.db.init_db import init_db

from app.api.health import router as health_router
from app.api.auth.router import router as auth_router
from app.api.admin.router import router as admin_router
from app.api.products.router import router as product_router
from app.api.orders.router import router as order_router
from app.api.pricing.router import router as pricing_router
from app.api.payments.router import router as payment_router

app = FastAPI(title=settings.APP_NAME)

# ---- RATE LIMITING ----
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)

# ---- CORS ----
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

# ---- ROUTES ----
app.include_router(health_router)
app.include_router(auth_router)
app.include_router(admin_router)
app.include_router(product_router)
app.include_router(order_router)
app.include_router(pricing_router)
app.include_router(payment_router)
