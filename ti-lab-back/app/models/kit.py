from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from app.models.base import Base


class Kit(Base):
    __tablename__ = "kits"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(255), nullable=False)
    descripcion = Column(Text, nullable=True)
    
    kit_componentes = relationship("KitComponente", back_populates="kit")
    detalle_prestamos = relationship("DetallePrestamo", back_populates="kit")