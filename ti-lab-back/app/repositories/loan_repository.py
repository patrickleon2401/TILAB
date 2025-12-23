from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from typing import List, Optional
from app.models.loan import Loan
from app.schemas.loan import LoanCreate, LoanUpdate


class LoanRepository:
    def __init__(self, db: Session):
        self.db = db
    
    def get_all(self, skip: int = 0, limit: int = 100) -> List[Loan]:
        return self.db.query(Loan).offset(skip).limit(limit).all()
    
    def get_by_id(self, loan_id: int) -> Optional[Loan]:
        return self.db.query(Loan).filter(Loan.id == loan_id).first()
    
    def get_active_loans(self) -> List[Loan]:
        return self.db.query(Loan).filter(Loan.status == "active").all()
    
    def create(self, loan_data: LoanCreate) -> Loan:
        loan = Loan(**loan_data.dict())
        self.db.add(loan)
        self.db.commit()
        self.db.refresh(loan)
        return loan
    
    def update(self, loan_id: int, loan_data: LoanUpdate) -> Optional[Loan]:
        loan = self.get_by_id(loan_id)
        if loan:
            update_data = loan_data.dict(exclude_unset=True)
            for field, value in update_data.items():
                setattr(loan, field, value)
            self.db.commit()
            self.db.refresh(loan)
        return loan
    
    def return_loan(self, loan_id: int) -> Optional[Loan]:
        loan = self.get_by_id(loan_id)
        if loan and loan.status == "active":
            loan.status = "returned"
            loan.return_date = func.now()
            self.db.commit()
            self.db.refresh(loan)
        return loan