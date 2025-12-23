from sqlalchemy import Column, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import Base


class JornadaPrestamo(Base):
    __tablename__ = "jornadas_prestamo"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    fecha = Column(Date, nullable=False)
    curso_id = Column(Integer, ForeignKey("cursos.id"), nullable=False)
    seccion_id = Column(Integer, ForeignKey("secciones.id"), nullable=False)
    
    curso = relationship("Curso", back_populates="jornadas")
    seccion = relationship("Seccion", back_populates="jornadas")
    prestamos = relationship("Prestamo", back_populates="jornada")