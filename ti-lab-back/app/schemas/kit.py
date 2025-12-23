from pydantic import BaseModel
from typing import Optional, List


class ComponenteBase(BaseModel):
    nombre: str
    requiere_numero_serie: bool = False


class Componente(ComponenteBase):
    id: int
    
    class Config:
        from_attributes = True


class KitComponenteBase(BaseModel):
    componente_id: int
    cantidad: int


class KitComponente(KitComponenteBase):
    id: int
    componente: Componente
    
    class Config:
        from_attributes = True


class KitBase(BaseModel):
    nombre: str
    descripcion: Optional[str] = None


class KitCreate(KitBase):
    pass


class KitUpdate(BaseModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None


class Kit(KitBase):
    id: int
    componentes: List[KitComponente] = []
    
    class Config:
        from_attributes = True