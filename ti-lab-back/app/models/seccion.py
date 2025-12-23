from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import Base


class Seccion(Base):
    __tablename__ = "secciones"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(255), nullable=False)
    profesor = Column(String(255), nullable=False)
    curso_id = Column(Integer, ForeignKey("cursos.id"), nullable=False)
    
    curso = relationship("Curso", back_populates="secciones")
    alumnos = relationship("Alumno", back_populates="seccion")
    jornadas = relationship("JornadaPrestamo", back_populates="seccion")