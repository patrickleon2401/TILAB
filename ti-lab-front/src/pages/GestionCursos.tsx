import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import CourseForm from '../components/CourseForm'
import CourseTable from '../components/CourseTable'
import SectionForm from '../components/SectionForm'
import SectionTable from '../components/SectionTable'
import { courseService } from '../services/courseService'
import { sectionService } from '../services/sectionService'
import type { Course, Section } from '../types/course'

type ViewMode = 'courses-list' | 'course-form' | 'section-management'

const GestionCursos = () => {
  const [searchParams] = useSearchParams()
  const [viewMode, setViewMode] = useState<ViewMode>('courses-list')
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [sections, setSections] = useState<Section[]>([])
  const [editSection, setEditSection] = useState<Section | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    loadCourses()
  }, [])

  useEffect(() => {
    const editId = searchParams.get('edit')
    if (editId) {
      setViewMode('course-form')
    }
  }, [searchParams])

  const loadCourses = async () => {
    setIsLoading(true)
    try {
      const response = await courseService.getAllCourses()
      if (response.success && response.data) {
        setCourses(response.data)
      } else {
        setMessage({
          type: 'error',
          text: response.message || 'Error al cargar los cursos'
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const loadSections = async (courseId: string) => {
    try {
      const response = await sectionService.getSectionsByCourseId(courseId)
      if (response.success && response.data) {
        setSections(response.data)
      } else {
        setMessage({
          type: 'error',
          text: response.message || 'Error al cargar las secciones'
        })
      }
    } catch {
      setMessage({
        type: 'error',
        text: 'Error inesperado al cargar las secciones'
      })
    }
  }

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course)
    setViewMode('course-form')
  }

  const handleDeleteCourse = async (id: string) => {
    try {
      const response = await courseService.deleteCourse(id)
      if (response.success) {
        setMessage({
          type: 'success',
          text: response.message || 'Curso eliminado exitosamente'
        })
        await loadCourses()
      } else {
        setMessage({
          type: 'error',
          text: response.message || 'Error al eliminar el curso'
        })
      }
    } catch {
      setMessage({
        type: 'error',
        text: 'Error inesperado al eliminar el curso'
      })
    }
  }

  const handleManageSections = (course: Course) => {
    setSelectedCourse(course)
    setMessage(null) // Limpiar mensajes anteriores
    loadSections(course.id!).then(() => {
      setEditSection(undefined)
      setViewMode('section-management')
    })
  }

  const handleEditSection = (section: Section) => {
    setEditSection(section)
    // Limpiar mensajes anteriores al iniciar edición
    setMessage(null)
  }

  const handleDeleteSection = async (id: string) => {
    if (!selectedCourse) return

    try {
      const response = await sectionService.deleteSection(selectedCourse.id!, id)
      if (response.success) {
        setMessage({
          type: 'success',
          text: response.message || 'Sección eliminada exitosamente'
        })
        await loadSections(selectedCourse.id!)
      } else {
        setMessage({
          type: 'error',
          text: response.message || 'Error al eliminar la sección'
        })
      }
    } catch {
      setMessage({
        type: 'error',
        text: 'Error inesperado al eliminar la sección'
      })
    }
  }

  const handleCourseFormSuccess = async () => {
    setViewMode('courses-list')
    setSelectedCourse(null)
    await loadCourses()
  }

  const handleSectionFormSuccess = async () => {
    // Primero limpiar edición
    setEditSection(undefined)
    // Luego recargar las secciones
    if (selectedCourse) {
      await loadSections(selectedCourse.id!)
    }
  }

  const renderBreadcrumbs = () => {
    const breadcrumbStyles = {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1.5rem',
      fontSize: '0.95rem',
      color: '#9ca3af'
    }

    const linkStyles = {
      color: '#3b82f6',
      textDecoration: 'none',
      cursor: 'pointer',
      ':hover': {
        textDecoration: 'underline'
      }
    }

    return (
      <div style={breadcrumbStyles}>
        <span 
          style={linkStyles}
          onClick={() => setViewMode('courses-list')}
        >
          Cursos
        </span>
        {viewMode === 'section-management' && selectedCourse && (
          <>
            <span>›</span>
            <span>{selectedCourse.nombre}</span>
            <span>›</span>
            <span>Secciones</span>
          </>
        )}
        {viewMode === 'course-form' && (
          <>
            <span>›</span>
            <span>{selectedCourse ? 'Editar Curso' : 'Nuevo Curso'}</span>
          </>
        )}
      </div>
    )
  }

  const renderContent = () => {
    switch (viewMode) {
      case 'course-form':
        return (
          <>
            <CourseForm
              onSuccess={handleCourseFormSuccess}
              onCancel={() => {
                setViewMode('courses-list')
                setSelectedCourse(null)
              }}
            />
          </>
        )

      case 'section-management':
        return selectedCourse ? (
          <>
            <div style={{ marginBottom: '2rem' }}>
              <SectionForm
                key={editSection ? `edit-${editSection.id}` : 'create'} // Forzar re-render
                cursoId={selectedCourse.id!}
                onSuccess={handleSectionFormSuccess}
                onCancel={() => {
                  setEditSection(undefined)
                  setMessage(null)
                }}
                editSection={editSection}
              />
            </div>
            
            <SectionTable
              sections={sections}
              onEdit={handleEditSection}
              onDelete={handleDeleteSection}
            />
          </>
        ) : null

      default:
        return (
          <>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <div>
                <h1 style={{ 
                  fontSize: '2rem', 
                  fontWeight: '600', 
                  marginBottom: '0.5rem',
                  color: '#ececf1' 
                }}>
                  Gestión de Cursos y Secciones
                </h1>
                <p style={{ 
                  fontSize: '1.1rem', 
                  color: '#9ca3af',
                  marginBottom: '2rem'
                }}>
                  Administración de cursos y sus secciones para el laboratorio.
                </p>
              </div>
              <button
                onClick={() => setViewMode('course-form')}
                style={{
                  padding: '0.75rem 2rem',
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                ➕ Nuevo Curso
              </button>
            </div>

            {message && (
              <div
                style={{
                  padding: '1rem',
                  borderRadius: '4px',
                  marginBottom: '2rem',
                  fontWeight: '500',
                  backgroundColor: message.type === 'success' ? '#10b981' : '#ef4444',
                  color: '#ffffff'
                }}
              >
                {message.text}
              </div>
            )}

            <CourseTable
              courses={courses}
              onEdit={handleEditCourse}
              onDelete={handleDeleteCourse}
              onManageSections={handleManageSections}
              isLoading={isLoading}
            />
          </>
        )
    }
  }

  const pageStyles: React.CSSProperties = {
    padding: '2rem 0'
  }

  return (
    <div style={pageStyles}>
      {viewMode !== 'courses-list' && renderBreadcrumbs()}
      {renderContent()}
    </div>
  )
}

export default GestionCursos