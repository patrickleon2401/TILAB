from sqlalchemy.orm import Session
from typing import List, Optional
from app.repositories.component_repository import ComponentRepository
from app.schemas.component import ComponentCreate, ComponentUpdate


class ComponentService:
    def __init__(self, db: Session):
        self.repository = ComponentRepository(db)
    
    def get_all_components(self, skip: int = 0, limit: int = 100) -> List[dict]:
        components = self.repository.get_all(skip=skip, limit=limit)
        return [comp.__dict__ for comp in components]
    
    def get_component_by_id(self, component_id: int) -> Optional[dict]:
        component = self.repository.get_by_id(component_id)
        return component.__dict__ if component else None
    
    def get_component_by_serial_number(self, serial_number: str) -> Optional[dict]:
        component = self.repository.get_by_serial_number(serial_number)
        return component.__dict__ if component else None
    
    def create_component(self, component_data: ComponentCreate) -> dict:
        existing = self.repository.get_by_serial_number(component_data.serial_number)
        if existing:
            raise ValueError("Serial number already exists")
        
        component = self.repository.create(component_data)
        return component.__dict__
    
    def update_component(self, component_id: int, component_data: ComponentUpdate) -> Optional[dict]:
        component = self.repository.update(component_id, component_data)
        return component.__dict__ if component else None
    
    def delete_component(self, component_id: int) -> bool:
        return self.repository.delete(component_id)