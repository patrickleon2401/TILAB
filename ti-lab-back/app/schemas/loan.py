from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from app.schemas.component import Component
from app.schemas.kit import Kit


class LoanBase(BaseModel):
    user_name: str
    user_email: EmailStr
    component_id: Optional[int] = None
    kit_id: Optional[int] = None
    expected_return_date: datetime
    notes: Optional[str] = None


class LoanCreate(LoanBase):
    pass


class LoanUpdate(BaseModel):
    user_name: Optional[str] = None
    user_email: Optional[EmailStr] = None
    return_date: Optional[datetime] = None
    status: Optional[str] = None
    notes: Optional[str] = None


class Loan(LoanBase):
    id: int
    loan_date: datetime
    return_date: Optional[datetime] = None
    status: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    component: Optional[Component] = None
    kit: Optional[Kit] = None
    
    class Config:
        from_attributes = True