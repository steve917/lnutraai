from pydantic import BaseModel, Field
from typing import Any, Dict

class LoginRequest(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class SimulateRequest(BaseModel):
    cohort: str = Field(default="SoC")  # SoC or FMD
    parameters: Dict[str, Any] = {}

class SimulateResponse(BaseModel):
    run_id: str
    cohort: str
    metrics: Dict[str, Any]
    chart: Dict[str, Any]  # client draws on canvas

class UploadResponse(BaseModel):
    upload_id: int
    filename: str
