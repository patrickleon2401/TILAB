from fastapi import FastAPI
from app.api.v1.api_router import api_router

app = FastAPI(
    title="TI-LAB Backend",
    version="1.0.0"
)

app.include_router(api_router, prefix="/api/v1")


@app.get("/health")
def health_check():
    return {"status": "healthy", "app": "TI-LAB Backend"}


@app.get("/")
def root():
    return {"message": "TI-LAB Backend funcionando 🚀", "version": "1.0.0"}