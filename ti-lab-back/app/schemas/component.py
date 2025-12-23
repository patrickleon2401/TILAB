from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


class ComponentBase(BaseModel):
    name: str
    description: Optional[str] = None
    serial_number: str
    category: Optional[str] = None
    status: str = "available"


class ComponentCreate(ComponentBase):
    pass


class ComponentUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    serial_number: Optional[str] = None
    category: Optional[str] = None
    status: Optional[str] = None


class Component(ComponentBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    is_active: bool
    
    class Config:
        from_attributes = True