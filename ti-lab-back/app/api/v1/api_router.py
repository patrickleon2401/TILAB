from fastapi import APIRouter
from app.api.v1.routers import kits

api_router = APIRouter()

api_router.include_router(kits.router, prefix="/kits", tags=["kits"])