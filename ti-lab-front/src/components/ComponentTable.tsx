import React, { useState } from 'react'
import type { Component } from '../types/component'
import ConfirmationModal from './ConfirmationModal'

interface ComponentTableProps {
  components: Component[]
  onEdit: (component: Component) => void
  onDelete: (id: string) => void
  isLoading?: boolean
}

const ComponentTable: React.FC<ComponentTableProps> = ({
  components,
  onEdit,
  onDelete,
  isLoading = false
}) => {
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    component: Component | null
  }>({ isOpen: false, component: null })

  const handleDeleteClick = (component: Component) => {
    setDeleteModal({ isOpen: true, component })
  }

  const handleDeleteConfirm = () => {
    if (deleteModal.component) {
      onDelete(deleteModal.component.id!)
      setDeleteModal({ isOpen: false, component: null })
    }
  }

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, component: null })
  }

  const containerStyles: React.CSSProperties = {
    backgroundColor: '#2d2e3f',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflowX: 'auto' as const
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

  const rowStyles = {
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: '#343541'
    }
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

  if (isLoading) {
    return (
      <div style={containerStyles}>
        <div style={loadingStyles}>
          Cargando componentes...
        </div>
      </div>
    )
  }

  if (components.length === 0) {
    return (
      <div style={containerStyles}>
        <div style={emptyStateStyles}>
          No hay componentes registrados
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
              <th style={headerStyles}>Nombre del Componente</th>
              <th style={headerStyles}>Cantidad en Inventario</th>
              <th style={headerStyles}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {components.map((component) => (
              <tr
                key={component.id}
                style={rowStyles}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#343541'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                <td style={cellStyles}>
                  <div>
                    <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>
                      {component.nombre}
                    </div>
                    {component.descripcion && (
                      <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                        {component.descripcion}
                      </div>
                    )}
                  </div>
                </td>
                <td style={cellStyles}>
                  <span
                    style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      backgroundColor: component.cantidad > 10 ? '#10b981' : component.cantidad > 0 ? '#f59e0b' : '#ef4444',
                      color: '#ffffff'
                    }}
                  >
                    {component.cantidad} unidades
                  </span>
                </td>
                <td style={cellStyles}>
                  <button
                    style={actionButtonStyles('edit')}
                    onClick={() => onEdit(component)}
                    title="Editar componente"
                  >
                    <span style={iconStyles}>✏️</span>
                    Editar
                  </button>
                  <button
                    style={actionButtonStyles('delete')}
                    onClick={() => handleDeleteClick(component)}
                    title="Eliminar componente"
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
        message={`¿Estás seguro de que deseas eliminar el componente "${deleteModal.component?.nombre}"?`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  )
}

export default ComponentTable