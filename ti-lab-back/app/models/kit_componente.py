from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import Base


class KitComponente(Base):
    __tablename__ = "kit_componentes"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    kit_id = Column(Integer, ForeignKey("kits.id"), nullable=False)
    componente_id = Column(Integer, ForeignKey("componentes.id"), nullable=False)
    cantidad = Column(Integer, nullable=False)
    
    kit = relationship("Kit", back_populates="kit_componentes")
    componente = relationship("Componente", back_populates="kit_componentes")