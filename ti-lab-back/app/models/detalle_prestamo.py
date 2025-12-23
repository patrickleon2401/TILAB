from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import Base


class DetallePrestamo(Base):
    __tablename__ = "detalles_prestamo"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    prestamo_id = Column(Integer, ForeignKey("prestamos.id"), nullable=False)
    kit_id = Column(Integer, ForeignKey("kits.id"), nullable=True)
    componente_id = Column(Integer, ForeignKey("componentes.id"), nullable=True)
    cantidad = Column(Integer, nullable=False)
    numero_serie = Column(String(100), nullable=True)
    
    prestamo = relationship("Prestamo", back_populates="detalles")
    kit = relationship("Kit", back_populates="detalle_prestamos")
    componente = relationship("Componente", back_populates="detalle_prestamos")