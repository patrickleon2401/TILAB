from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.models.base import Base


class Curso(Base):
    __tablename__ = "cursos"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(255), nullable=False)
    codigo = Column(String(50), nullable=False, unique=True)
    
    secciones = relationship("Seccion", back_populates="curso")
    jornadas = relationship("JornadaPrestamo", back_populates="curso")