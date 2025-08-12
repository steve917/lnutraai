from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import ORJSONResponse
import httpx, os, base64, hashlib, time
from typing import Dict, Any
import sentry_sdk
from .settings import settings
from .db import Base, engine
from . import schemas

if settings.SENTRY_DSN:
    sentry_sdk.init(dsn=settings.SENTRY_DSN, traces_sample_rate=0.1)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="L-Nutra AI API", default_response_class=ORJSONResponse)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.WEB_APP_URL, "*"] if settings.APP_ENV == "staging" else [settings.WEB_APP_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/healthz")
def healthz():
    return {"ok": True, "env": settings.APP_ENV}

@app.post("/auth/login", response_model=schemas.TokenResponse)
def login(req: schemas.LoginRequest):
    payload = f"{req.email}:{int(time.time())}"
    token = base64.urlsafe_b64encode(hashlib.sha256(payload.encode()).digest()).decode()
    return {"access_token": token}

@app.post("/uploads/csv", response_model=schemas.UploadResponse)
async def upload_csv(file: UploadFile = File(...)):
    data = await file.read()
    os.makedirs("var/uploads", exist_ok=True)
    path = f"var/uploads/{int(time.time())}_{file.filename}"
    with open(path, "wb") as f:
        f.write(data)
    return {"upload_id": int(time.time()), "filename": file.filename}

def _ml_fallback(cohort: str) -> Dict[str, Any]:
    xs = list(range(0, 30))
    ys = [70 + (i * (1 if cohort == "FMD" else 0.5)) for i in xs]
    return {
        "metrics": {"delta_weight": (-2.3 if cohort == "FMD" else -0.8), "adherence": 0.93},
        "chart": {"x": xs, "y": ys, "label": f"{cohort} projection"}
    }

@app.post("/simulate", response_model=schemas.SimulateResponse)
async def simulate(body: schemas.SimulateRequest):
    try:
        auth = None
        if settings.ML_BASIC_PASS:
            auth = httpx.BasicAuth("lnutra", settings.ML_BASIC_PASS)
        async with httpx.AsyncClient(base_url=settings.ML_API_BASE, timeout=settings.ML_TIMEOUT_SEC, auth=auth) as client:
            payload = {"cohort": body.cohort, "params": body.parameters}
            r = await client.post("/predict", json=payload)
            r.raise_for_status()
            ml = r.json()
            run_id = ml.get("run_id") or base64.urlsafe_b64encode(os.urandom(9)).decode()
            return {"run_id": run_id, "cohort": body.cohort, "metrics": ml.get("metrics", {}), "chart": ml.get("chart", {})}
    except Exception:
        if settings.ENTITLEMENT_OVERRIDE:
            fb = _ml_fallback(body.cohort)
            run_id = base64.urlsafe_b64encode(os.urandom(9)).decode()
            return {"run_id": run_id, "cohort": body.cohort, **fb}
        raise HTTPException(status_code=502, detail="Upstream ML unavailable")
