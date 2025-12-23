from sqlalchemy.orm import Session
from typing import List, Optional
from app.repositories.loan_repository import LoanRepository
from app.repositories.component_repository import ComponentRepository
from app.repositories.kit_repository import KitRepository
from app.schemas.loan import LoanCreate, LoanUpdate


class LoanService:
    def __init__(self, db: Session):
        self.loan_repository = LoanRepository(db)
        self.component_repository = ComponentRepository(db)
        self.kit_repository = KitRepository(db)
    
    def get_all_loans(self, skip: int = 0, limit: int = 100) -> List[dict]:
        loans = self.loan_repository.get_all(skip=skip, limit=limit)
        return [loan.__dict__ for loan in loans]
    
    def get_loan_by_id(self, loan_id: int) -> Optional[dict]:
        loan = self.loan_repository.get_by_id(loan_id)
        return loan.__dict__ if loan else None
    
    def get_active_loans(self) -> List[dict]:
        loans = self.loan_repository.get_active_loans()
        return [loan.__dict__ for loan in loans]
    
    def create_loan(self, loan_data: LoanCreate) -> dict:
        if loan_data.component_id:
            component = self.component_repository.get_by_id(loan_data.component_id)
            if not component:
                raise ValueError("Component not found")
            if component.status != "available":
                raise ValueError("Component is not available")
        
        if loan_data.kit_id:
            kit = self.kit_repository.get_by_id(loan_data.kit_id)
            if not kit:
                raise ValueError("Kit not found")
            if kit.status != "available":
                raise ValueError("Kit is not available")
        
        loan = self.loan_repository.create(loan_data)
        
        if loan_data.component_id:
            component.status = "loaned"
        if loan_data.kit_id:
            kit.status = "loaned"
        
        return loan.__dict__
    
    def return_loan(self, loan_id: int) -> Optional[dict]:
        loan = self.loan_repository.get_by_id(loan_id)
        if not loan:
            return None
        
        if loan.component_id:
            component = self.component_repository.get_by_id(loan.component_id)
            if component:
                component.status = "available"
        
        if loan.kit_id:
            kit = self.kit_repository.get_by_id(loan.kit_id)
            if kit:
                kit.status = "available"
        
        returned_loan = self.loan_repository.return_loan(loan_id)
        return returned_loan.__dict__ if returned_loan else None
    
    def update_loan(self, loan_id: int, loan_data: LoanUpdate) -> Optional[dict]:
        loan = self.loan_repository.update(loan_id, loan_data)
        return loan.__dict__ if loan else None