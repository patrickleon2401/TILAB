import React, { useState } from 'react'
import type { Section } from '../types/course'
import ConfirmationModal from './ConfirmationModal'

interface SectionTableProps {
  sections: Section[]
  onEdit: (section: Section) => void
  onDelete: (id: string) => void
  isLoading?: boolean
}

const SectionTable: React.FC<SectionTableProps> = ({
  sections,
  onEdit,
  onDelete,
  isLoading = false
}) => {
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    section: Section | null
  }>({ isOpen: false, section: null })

  const handleDeleteClick = (section: Section) => {
    setDeleteModal({ isOpen: true, section })
  }

  const handleDeleteConfirm = () => {
    if (deleteModal.section) {
      onDelete(deleteModal.section.id!)
      setDeleteModal({ isOpen: false, section: null })
    }
  }

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, section: null })
  }

  const containerStyles: React.CSSProperties = {
    backgroundColor: '#2d2e3f',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflowX: 'auto',
    marginTop: '2rem'
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

  const actionButtonStyles = (type: 'edit' | 'delete') => ({
    padding: '0.5rem 0.75rem',
    margin: '0 0.25rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: type === 'edit' ? '#3b82f6' : '#ef4444',
    color: '#ffffff',
    ':hover': {
      backgroundColor: type === 'edit' ? '#2563eb' : '#dc2626',
      transform: 'translateY(-1px)'
    }
  })

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

  const professorStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  }

  const professorAvatarStyles = {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#4a4b5e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#ececf1'
  }

  if (isLoading) {
    return (
      <div style={containerStyles}>
        <div style={loadingStyles}>
          Cargando secciones...
        </div>
      </div>
    )
  }

  if (sections.length === 0) {
    return (
      <div style={containerStyles}>
        <div style={emptyStateStyles}>
          No hay secciones registradas para este curso
        </div>
      </div>
    )
  }

  return (
    <>
      <div style={containerStyles}>
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: '600', 
          marginBottom: '1rem', 
          color: '#ececf1' 
        }}>
          Secciones del Curso ({sections.length})
        </h3>
        
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={headerStyles}>Nombre de la Sección</th>
              <th style={headerStyles}>Profesor a Cargo</th>
              <th style={headerStyles}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section) => (
              <tr
                key={section.id}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#343541'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                <td style={cellStyles}>
                  <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>
                    {section.nombre}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                    ID: {section.id}
                  </div>
                </td>
                <td style={cellStyles}>
                  <div style={professorStyles}>
                    <div style={professorAvatarStyles}>
                      {section.profesor.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: '500' }}>{section.profesor}</div>
                      {section.createdAt && (
                        <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                          Creado: {new Date(section.createdAt).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td style={cellStyles}>
                  <button
                    style={actionButtonStyles('edit')}
                    onClick={() => onEdit(section)}
                    title="Editar sección"
                  >
                    <span style={iconStyles}>✏️</span>
                    Editar
                  </button>
                  <button
                    style={actionButtonStyles('delete')}
                    onClick={() => handleDeleteClick(section)}
                    title="Eliminar sección"
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
        message={`¿Estás seguro de que deseas eliminar la sección "${deleteModal.section?.nombre}"?`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  )
}

export default SectionTable