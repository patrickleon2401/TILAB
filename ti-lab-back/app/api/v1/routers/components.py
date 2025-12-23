from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.services.component_service import ComponentService
from app.schemas.component import Component, ComponentCreate, ComponentUpdate

router = APIRouter()


@router.get("/", response_model=List[Component])
def get_components(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    service = ComponentService(db)
    return service.get_all_components(skip=skip, limit=limit)


@router.get("/{component_id}", response_model=Component)
def get_component(component_id: int, db: Session = Depends(get_db)):
    service = ComponentService(db)
    component = service.get_component_by_id(component_id)
    if not component:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Component not found"
        )
    return component


@router.post("/", response_model=Component, status_code=status.HTTP_201_CREATED)
def create_component(component_data: ComponentCreate, db: Session = Depends(get_db)):
    service = ComponentService(db)
    try:
        return service.create_component(component_data)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.put("/{component_id}", response_model=Component)
def update_component(component_id: int, component_data: ComponentUpdate, db: Session = Depends(get_db)):
    service = ComponentService(db)
    component = service.update_component(component_id, component_data)
    if not component:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Component not found"
        )
    return component


@router.delete("/{component_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_component(component_id: int, db: Session = Depends(get_db)):
    service = ComponentService(db)
    success = service.delete_component(component_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Component not found"
        )