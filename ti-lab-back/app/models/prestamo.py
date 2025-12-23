from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import Base


class Prestamo(Base):
    __tablename__ = "prestamos"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    jornada_id = Column(Integer, ForeignKey("jornadas_prestamo.id"), nullable=False)
    alumno_id = Column(Integer, ForeignKey("alumnos.id"), nullable=False)
    estado = Column(String(20), nullable=False)
    
    jornada = relationship("JornadaPrestamo", back_populates="prestamos")
    alumno = relationship("Alumno", back_populates="prestamos")
    detalles = relationship("DetallePrestamo", back_populates="prestamo")