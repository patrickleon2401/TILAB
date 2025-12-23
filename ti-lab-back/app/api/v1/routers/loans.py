from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.services.loan_service import LoanService
from app.schemas.loan import Loan, LoanCreate, LoanUpdate

router = APIRouter()


@router.get("/", response_model=List[Loan])
def get_loans(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    service = LoanService(db)
    return service.get_all_loans(skip=skip, limit=limit)


@router.get("/active", response_model=List[Loan])
def get_active_loans(db: Session = Depends(get_db)):
    service = LoanService(db)
    return service.get_active_loans()


@router.get("/{loan_id}", response_model=Loan)
def get_loan(loan_id: int, db: Session = Depends(get_db)):
    service = LoanService(db)
    loan = service.get_loan_by_id(loan_id)
    if not loan:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Loan not found"
        )
    return loan


@router.post("/", response_model=Loan, status_code=status.HTTP_201_CREATED)
def create_loan(loan_data: LoanCreate, db: Session = Depends(get_db)):
    service = LoanService(db)
    try:
        return service.create_loan(loan_data)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.put("/{loan_id}/return", response_model=Loan)
def return_loan(loan_id: int, db: Session = Depends(get_db)):
    service = LoanService(db)
    loan = service.return_loan(loan_id)
    if not loan:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Loan not found"
        )
    return loan


@router.put("/{loan_id}", response_model=Loan)
def update_loan(loan_id: int, loan_data: LoanUpdate, db: Session = Depends(get_db)):
    service = LoanService(db)
    loan = service.update_loan(loan_id, loan_data)
    if not loan:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Loan not found"
        )
    return loan