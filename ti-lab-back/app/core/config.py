import os
from pydantic import BaseModel


class Settings(BaseModel):
    app_name: str = "TI-LAB Backend"
    debug: bool = False
    version: str = "1.0.0"
    
    database_url: str = os.getenv("DATABASE_URL", "sqlite:///./ti_lab.db")


settings = Settings()