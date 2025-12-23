from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from app.models.base import Base


class Componente(Base):
    __tablename__ = "componentes"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(255), nullable=False)
    requiere_numero_serie = Column(Boolean, nullable=False)
    
    kit_componentes = relationship("KitComponente", back_populates="componente")
    detalle_prestamos = relationship("DetallePrestamo", back_populates="componente")