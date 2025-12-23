from sqlalchemy.orm import Session
from typing import List, Optional
from app.repositories.kit_repository import KitRepository
from app.schemas.kit import KitCreate, KitUpdate


class KitService:
    def __init__(self, db: Session):
        self.repository = KitRepository(db)
    
    def get_all_kits(self, skip: int = 0, limit: int = 100) -> List[dict]:
        kits = self.repository.get_all(skip=skip, limit=limit)
        return [kit.__dict__ for kit in kits]
    
    def get_kit_by_id(self, kit_id: int) -> Optional[dict]:
        kit = self.repository.get_by_id(kit_id)
        return kit.__dict__ if kit else None
    
    def get_kit_by_kit_code(self, kit_code: str) -> Optional[dict]:
        kit = self.repository.get_by_kit_code(kit_code)
        return kit.__dict__ if kit else None
    
    def create_kit(self, kit_data: KitCreate) -> dict:
        existing = self.repository.get_by_kit_code(kit_data.kit_code)
        if existing:
            raise ValueError("Kit code already exists")
        
        kit = self.repository.create(kit_data)
        return kit.__dict__
    
    def update_kit(self, kit_id: int, kit_data: KitUpdate) -> Optional[dict]:
        kit = self.repository.update(kit_id, kit_data)
        return kit.__dict__ if kit else None
    
    def delete_kit(self, kit_id: int) -> bool:
        return self.repository.delete(kit_id)