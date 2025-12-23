import React, { useState } from 'react'
import type { Course } from '../types/course'
import ConfirmationModal from './ConfirmationModal'

interface CourseTableProps {
  courses: Course[]
  onEdit: (course: Course) => void
  onDelete: (id: string) => void
  onManageSections: (course: Course) => void
  isLoading?: boolean
}

const CourseTable: React.FC<CourseTableProps> = ({
  courses,
  onEdit,
  onDelete,
  onManageSections,
  isLoading = false
}) => {
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    course: Course | null
  }>({ isOpen: false, course: null })

  const handleDeleteClick = (course: Course) => {
    setDeleteModal({ isOpen: true, course })
  }

  const handleDeleteConfirm = () => {
    if (deleteModal.course) {
      onDelete(deleteModal.course.id!)
      setDeleteModal({ isOpen: false, course: null })
    }
  }

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, course: null })
  }

  const containerStyles: React.CSSProperties = {
    backgroundColor: '#2d2e3f',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflowX: 'auto'
  }

  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse' as const,
    color: '#ececf1'
  }

  const headerStyles = {
    textAlign: 'left' as const,
    padding: '1rem',
    borderBottom: '2px solid #4a4b5e',
    fontWeight: '600',
    fontSize: '1rem',
    color: '#9ca3af'
  }

  const cellStyles = {
    padding: '1rem',
    borderBottom: '1px solid #4a4b5e',
    fontSize: '0.95rem'
  }

  const actionButtonStyles = (type: 'edit' | 'delete' | 'sections') => {
    const colors = {
      edit: '#3b82f6',
      delete: '#ef4444',
      sections: '#10b981'
    }
    
    return {
      padding: '0.5rem 0.75rem',
      margin: '0 0.25rem',
      border: 'none',
      borderRadius: '4px',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      backgroundColor: colors[type],
      color: '#ffffff',
      ':hover': {
        backgroundColor: type === 'edit' ? '#2563eb' : type === 'delete' ? '#dc2626' : '#059669',
        transform: 'translateY(-1px)'
      }
    }
  }

  const iconStyles = {
    marginRight: '0.5rem',
    fontSize: '1rem'
  }

  const emptyStateStyles = {
    textAlign: 'center' as const,
    padding: '3rem',
    color: '#9ca3af',
    fontSize: '1.1rem'
  }

  const loadingStyles = {
    textAlign: 'center' as const,
    padding: '2rem',
    color: '#9ca3af',
    fontSize: '1.1rem'
  }

  const sectionCountStyles = (count: number) => ({
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.875rem',
    fontWeight: '500',
    backgroundColor: count > 0 ? '#10b981' : '#6b7280',
    color: '#ffffff',
    display: 'inline-block'
  })

  if (isLoading) {
    return (
      <div style={containerStyles}>
        <div style={loadingStyles}>
          Cargando cursos...
        </div>
      </div>
    )
  }

  if (courses.length === 0) {
    return (
      <div style={containerStyles}>
        <div style={emptyStateStyles}>
          No hay cursos registrados
        </div>
      </div>
    )
  }

  return (
    <>
      <div style={containerStyles}>
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={headerStyles}>Nombre del Curso</th>
              <th style={headerStyles}>Descripción</th>
              <th style={headerStyles}>Secciones</th>
              <th style={headerStyles}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr
                key={course.id}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#343541'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                <td style={cellStyles}>
                  <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>
                    {course.nombre}
                  </div>
                </td>
                <td style={cellStyles}>
                  <div style={{ color: '#9ca3af' }}>
                    {course.descripcion || 'Sin descripción'}
                  </div>
                </td>
                <td style={cellStyles}>
                  <div style={sectionCountStyles(course.secciones.length)}>
                    {course.secciones.length} secciones
                  </div>
                </td>
                <td style={cellStyles}>
                  <button
                    style={actionButtonStyles('sections')}
                    onClick={() => onManageSections(course)}
                    title="Gestionar secciones"
                  >
                    <span style={iconStyles}>📚</span>
                    Secciones
                  </button>
                  <button
                    style={actionButtonStyles('edit')}
                    onClick={() => onEdit(course)}
                    title="Editar curso"
                  >
                    <span style={iconStyles}>✏️</span>
                    Editar
                  </button>
                  <button
                    style={actionButtonStyles('delete')}
                    onClick={() => handleDeleteClick(course)}
                    title="Eliminar curso"
                  >
                    <span style={iconStyles}>🗑️</span>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        title="Confirmar Eliminación"
        message={`¿Estás seguro de que deseas eliminar el curso "${deleteModal.course?.nombre}"? Esto también eliminará todas sus secciones.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  )
}

export default CourseTable