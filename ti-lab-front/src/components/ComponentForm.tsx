import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import { componentService } from '../services/componentService'
import type { ComponentFormData, CreateComponentRequest } from '../types/component'

const ComponentForm = () => {
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [isLoading, setIsLoading] = useState(!!editId)

  const initialState: ComponentFormData = {
    nombre: '',
    cantidad: '',
    descripcion: ''
  }

  const { formData, errors, handleChange, validateForm, resetForm, setFormData } = useForm(initialState)

  useEffect(() => {
    const loadComponent = async () => {
      if (editId) {
        try {
          const response = await componentService.getComponentById(editId)
          if (response.success && response.data) {
            const component = response.data
            setFormData({
              nombre: component.nombre,
              cantidad: component.cantidad.toString(),
              descripcion: component.descripcion || ''
            })
          } else {
            setSubmitMessage({
              type: 'error',
              text: response.message || 'Error al cargar el componente para editar'
            })
          }
        } finally {
          setIsLoading(false)
        }
      }
    }

    loadComponent()
  }, [editId, setFormData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      const request: CreateComponentRequest = {
        nombre: formData.nombre.trim(),
        cantidad: parseInt(formData.cantidad, 10),
        descripcion: formData.descripcion.trim() || undefined
      }

      let response
      if (editId) {
        response = await componentService.updateComponent(editId, request)
      } else {
        response = await componentService.createComponent(request)
      }

      if (response.success) {
        const action = editId ? 'actualizado' : 'registrado'
        setSubmitMessage({
          type: 'success',
          text: response.message || `Componente ${action} exitosamente`
        })
        if (!editId) {
          resetForm()
        }
      } else {
        setSubmitMessage({
          type: 'error',
          text: response.message || `Error al ${editId ? 'actualizar' : 'registrar'} el componente`
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const formStyles = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#2d2e3f',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  }

  const inputStyles = {
    width: '100%',
    padding: '0.75rem',
    marginTop: '0.5rem',
    border: '1px solid #4a4b5e',
    borderRadius: '4px',
    backgroundColor: '#343541',
    color: '#ececf1',
    fontSize: '1rem',
    boxSizing: 'border-box' as const
  }

  const labelStyles = {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#ececf1',
    fontWeight: '500'
  }

  const errorStyles = {
    color: '#ff6b6b',
    fontSize: '0.875rem',
    marginTop: '0.25rem'
  }

  const buttonStyles = {
    backgroundColor: isSubmitting ? '#6b7280' : '#3b82f6',
    color: '#ffffff',
    padding: '0.75rem 2rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: isSubmitting ? 'not-allowed' : 'pointer',
    opacity: isSubmitting ? 0.7 : 1,
    marginTop: '1.5rem',
    transition: 'all 0.2s ease'
  }

  const messageStyles = {
    padding: '1rem',
    borderRadius: '4px',
    marginTop: '1rem',
    textAlign: 'center' as const,
    fontWeight: '500'
  }

  if (isLoading) {
    return (
      <div style={formStyles}>
        <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
          Cargando datos del componente...
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={formStyles}>
      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="nombre" style={labelStyles}>
          Nombre del Componente *
        </label>
        <input
          id="nombre"
          type="text"
          value={formData.nombre}
          onChange={(e) => handleChange('nombre', e.target.value)}
          style={inputStyles}
          placeholder="Ej: Resistencia 10k"
          disabled={isSubmitting}
        />
        {errors.nombre && <div style={errorStyles}>{errors.nombre}</div>}
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="cantidad" style={labelStyles}>
          Cantidad Actual en Inventario *
        </label>
        <input
          id="cantidad"
          type="number"
          value={formData.cantidad}
          onChange={(e) => handleChange('cantidad', e.target.value)}
          style={inputStyles}
          placeholder="0"
          min="0"
          disabled={isSubmitting}
        />
        {errors.cantidad && <div style={errorStyles}>{errors.cantidad}</div>}
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="descripcion" style={labelStyles}>
          Descripción (opcional)
        </label>
        <textarea
          id="descripcion"
          value={formData.descripcion}
          onChange={(e) => handleChange('descripcion', e.target.value)}
          style={{
            ...inputStyles,
            minHeight: '100px',
            resize: 'vertical' as const
          }}
          placeholder="Describe el componente, sus características, uso, etc."
          disabled={isSubmitting}
        />
      </div>

      <button
        type="submit"
        style={buttonStyles}
        disabled={isSubmitting}
      >
        {isSubmitting ? (editId ? 'Actualizando...' : 'Registrando...') : (editId ? 'Actualizar Componente' : 'Registrar Componente')}
      </button>

      {submitMessage && (
        <div
          style={{
            ...messageStyles,
            backgroundColor: submitMessage.type === 'success' ? '#10b981' : '#ef4444',
            color: '#ffffff'
          }}
        >
          {submitMessage.text}
        </div>
      )}
    </form>
  )
}

export default ComponentForm