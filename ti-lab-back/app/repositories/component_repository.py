from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.component import Component
from app.schemas.component import ComponentCreate, ComponentUpdate


class ComponentRepository:
    def __init__(self, db: Session):
        self.db = db
    
    def get_all(self, skip: int = 0, limit: int = 100) -> List[Component]:
        return self.db.query(Component).filter(Component.is_active == True).offset(skip).limit(limit).all()
    
    def get_by_id(self, component_id: int) -> Optional[Component]:
        return self.db.query(Component).filter(Component.id == component_id, Component.is_active == True).first()
    
    def get_by_serial_number(self, serial_number: str) -> Optional[Component]:
        return self.db.query(Component).filter(Component.serial_number == serial_number, Component.is_active == True).first()
    
    def create(self, component_data: ComponentCreate) -> Component:
        component = Component(**component_data.dict())
        self.db.add(component)
        self.db.commit()
        self.db.refresh(component)
        return component
    
    def update(self, component_id: int, component_data: ComponentUpdate) -> Optional[Component]:
        component = self.get_by_id(component_id)
        if component:
            update_data = component_data.dict(exclude_unset=True)
            for field, value in update_data.items():
                setattr(component, field, value)
            self.db.commit()
            self.db.refresh(component)
        return component
    
    def delete(self, component_id: int) -> bool:
        component = self.get_by_id(component_id)
        if component:
            component.is_active = False
            self.db.commit()
            return True
        return False