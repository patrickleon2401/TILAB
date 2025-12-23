import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ComponentTable from '../components/ComponentTable'
import { componentService } from '../services/componentService'
import type { Component } from '../types/component'

const ListaComponentes = () => {
  const [components, setComponents] = useState<Component[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const navigate = useNavigate()

  const loadComponents = async () => {
    setIsLoading(true)
    try {
      const response = await componentService.getAllComponents()
      if (response.success && response.data) {
        setComponents(response.data)
      } else {
        setMessage({
          type: 'error',
          text: response.message || 'Error al cargar los componentes'
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadComponents()
  }, [])

  const handleEdit = (component: Component) => {
    navigate(`/registrar-componente?edit=${component.id}`)
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await componentService.deleteComponent(id)
      if (response.success) {
        setMessage({
          type: 'success',
          text: response.message || 'Componente eliminado exitosamente'
        })
        await loadComponents()
      } else {
        setMessage({
          type: 'error',
          text: response.message || 'Error al eliminar el componente'
        })
      }
    } catch {
      setMessage({
        type: 'error',
        text: 'Error inesperado al eliminar el componente'
      })
    }
  }

  const pageStyles: React.CSSProperties = {
    padding: '2rem 0'
  }

  const titleStyles = {
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#ececf1'
  }

  const subtitleStyles = {
    fontSize: '1.1rem',
    color: '#9ca3af',
    marginBottom: '2rem'
  }

  const messageStyles = {
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '2rem',
    fontWeight: '500'
  }

  const successMessageStyles = {
    ...messageStyles,
    backgroundColor: '#10b981',
    color: '#ffffff'
  }

  const errorMessageStyles = {
    ...messageStyles,
    backgroundColor: '#ef4444',
    color: '#ffffff'
  }

  return (
    <div style={pageStyles}>
      <h1 style={titleStyles}>Lista de Componentes</h1>
      <p style={subtitleStyles}>
        Visualización y gestión de todos los componentes registrados en el inventario del laboratorio.
      </p>
      
      {message && (
        <div
          style={message.type === 'success' ? successMessageStyles : errorMessageStyles}
        >
          {message.text}
        </div>
      )}

      <ComponentTable
        components={components}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />
    </div>
  )
}

export default ListaComponentes