from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # App
    APP_NAME: str = "Vijetha Digital Backend"
    ENV: str = "dev"

    # Database (MANDATORY)
    DATABASE_URL: str

    # JWT
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"

    # Admin bootstrap
    ADMIN_EMAIL: str
    ADMIN_PASSWORD: str

    # Cloudinary
    CLOUDINARY_CLOUD_NAME: str
    CLOUDINARY_API_KEY: str
    CLOUDINARY_API_SECRET: str

    # Razorpay
    RAZORPAY_KEY_ID: str
    RAZORPAY_KEY_SECRET: str
    RAZORPAY_WEBHOOK_SECRET: str

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
