from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.kit import Kit
from app.schemas.kit import KitCreate, KitUpdate


class KitRepository:
    def __init__(self, db: Session):
        self.db = db
    
    def get_all(self, skip: int = 0, limit: int = 100) -> List[Kit]:
        return self.db.query(Kit).filter(Kit.is_active == True).offset(skip).limit(limit).all()
    
    def get_by_id(self, kit_id: int) -> Optional[Kit]:
        return self.db.query(Kit).filter(Kit.id == kit_id, Kit.is_active == True).first()
    
    def get_by_kit_code(self, kit_code: str) -> Optional[Kit]:
        return self.db.query(Kit).filter(Kit.kit_code == kit_code, Kit.is_active == True).first()
    
    def create(self, kit_data: KitCreate) -> Kit:
        kit = Kit(**kit_data.dict())
        self.db.add(kit)
        self.db.commit()
        self.db.refresh(kit)
        return kit
    
    def update(self, kit_id: int, kit_data: KitUpdate) -> Optional[Kit]:
        kit = self.get_by_id(kit_id)
        if kit:
            update_data = kit_data.dict(exclude_unset=True)
            for field, value in update_data.items():
                setattr(kit, field, value)
            self.db.commit()
            self.db.refresh(kit)
        return kit
    
    def delete(self, kit_id: int) -> bool:
        kit = self.get_by_id(kit_id)
        if kit:
            kit.is_active = False
            self.db.commit()
            return True
        return False