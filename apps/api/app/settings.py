from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # App
    APP_ENV: str = "staging"
    APP_BASE_URL: str = "http://localhost:8080"
    WEB_APP_URL: str = "http://localhost:3000"
    MOBILE_SCHEME: str = "lnutra"
    COMPANY_NAME: str = "L-Nutra AI"
    SUPPORT_EMAIL: str = "support@example.com"
    PRIVACY_EMAIL: str = "privacy@example.com"
    # Auth
    JWT_SECRET: str = "dev-secret"
    JWT_EXPIRES_MIN: int = 60 * 24 * 7
    CSRF_SECRET: str = "dev-csrf"
    # DB
    DATABASE_URL: str = "postgresql+psycopg://postgres:postgres@localhost:5432/lnutra"
    # Billing & flags
    BILLING_ENABLED: bool = False
    ENTITLEMENT_OVERRIDE: bool = True
    TRIAL_DAYS: int = 9999
    # ML proxy
    ML_API_BASE: str = "http://localhost:9000"
    ML_BASIC_PASS: Optional[str] = None
    ML_TIMEOUT_SEC: float = 1.8
    # Email
    EMAIL_PROVIDER: Optional[str] = None
    RESEND_API_KEY: Optional[str] = None
    EMAIL_FROM: Optional[str] = None
    # Stripe
    STRIPE_SECRET_KEY: Optional[str] = None
    STRIPE_WEBHOOK_SECRET: Optional[str] = None
    STRIPE_PRICE_STARTER: Optional[str] = None
    STRIPE_PRICE_PRO: Optional[str] = None
    STRIPE_PRICE_CARE: Optional[str] = None
    STRIPE_TAX: Optional[str] = None
    BILLING_RETURN_URL: Optional[str] = None
    BILLING_CANCEL_URL: Optional[str] = None
    REVENUECAT_WEBHOOK_SECRET: Optional[str] = None
    # Observability
    SENTRY_DSN: Optional[str] = None
    POSTHOG_API_KEY: Optional[str] = None

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()  # type: ignore
