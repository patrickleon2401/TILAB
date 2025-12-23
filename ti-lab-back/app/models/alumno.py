from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import Base


class Alumno(Base):
    __tablename__ = "alumnos"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    codigo = Column(String(50), nullable=False)
    nombres = Column(String(255), nullable=False)
    apellidos = Column(String(255), nullable=False)
    seccion_id = Column(Integer, ForeignKey("secciones.id"), nullable=False)
    
    seccion = relationship("Seccion", back_populates="alumnos")
    prestamos = relationship("Prestamo", back_populates="alumno")