import { useState, useEffect } from 'react'
import { sectionService } from '../services/sectionService'
import type { SectionFormData, SectionFormValidationErrors } from '../types/course'

interface SectionFormProps {
  cursoId: string
  onSuccess?: () => void
  onCancel?: () => void
  editSection?: {
    id: string
    nombre: string
    profesor: string
  }
}

const SectionForm: React.FC<SectionFormProps> = ({
  cursoId,
  onSuccess,
  onCancel,
  editSection
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const [formData, setFormData] = useState<SectionFormData>({
    nombre: '',
    profesor: ''
  })
  
  const [errors, setErrors] = useState<SectionFormValidationErrors>({})

  useEffect(() => {
    if (editSection) {
      setFormData({
        nombre: editSection.nombre,
        profesor: editSection.profesor
      })
    } else {
      // Limpiar formulario cuando no hay edición
      setFormData({ nombre: '', profesor: '' })
    }
  }, [editSection])

  const validateField = (name: keyof SectionFormData, value: string): string | undefined => {
    switch (name) {
      case 'nombre':
        if (!value.trim()) {
          return 'El nombre de la sección es obligatorio'
        }
        if (value.trim().length < 2) {
          return 'El nombre debe tener al menos 2 caracteres'
        }
        return undefined
      case 'profesor':
        if (!value.trim()) {
          return 'El nombre del profesor es obligatorio'
        }
        return undefined
      default:
        return undefined
    }
  }

  const validateForm = (): boolean => {
    const newErrors: SectionFormValidationErrors = {}
    let isValid = true

    Object.keys(formData).forEach((key) => {
      const fieldName = key as keyof SectionFormData
      const error = validateField(fieldName, formData[fieldName])
      if (error) {
        newErrors[fieldName] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (name: keyof SectionFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      const request = {
        nombre: formData.nombre.trim(),
        profesor: formData.profesor.trim(),
        cursoId
      }

      let response
      if (editSection) {
        response = await sectionService.updateSection(cursoId, editSection.id, request)
      } else {
        response = await sectionService.createSection(request)
      }

      if (response.success) {
        const action = editSection ? 'actualizada' : 'creada'
        setSubmitMessage({
          type: 'success',
          text: response.message || `Sección ${action} exitosamente`
        })
        // Siempre limpiar el formulario
        setFormData({ nombre: '', profesor: '' })
        // Llamar onSuccess después de un pequeño delay para asegurar que el estado se actualice
        setTimeout(() => {
          onSuccess?.()
        }, 100)
      } else {
        setSubmitMessage({
          type: 'error',
          text: response.message || `Error al ${editSection ? 'actualizar' : 'crear'} la sección`
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
    marginRight: '1rem',
    transition: 'all 0.2s ease'
  }

  const cancelButtonStyles = {
    ...buttonStyles,
    backgroundColor: '#4b5563',
    opacity: 1
  }

  const messageStyles = {
    padding: '1rem',
    borderRadius: '4px',
    marginTop: '1rem',
    textAlign: 'center' as const,
    fontWeight: '500'
  }

  return (
    <form onSubmit={handleSubmit} style={formStyles}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: '#ececf1' }}>
        {editSection ? 'Editar Sección' : 'Nueva Sección'}
      </h2>

      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="nombre" style={labelStyles}>
          Nombre de la Sección *
        </label>
        <input
          id="nombre"
          type="text"
          value={formData.nombre}
          onChange={(e) => handleChange('nombre', e.target.value)}
          style={inputStyles}
          placeholder="Ej: Sección 1"
          disabled={isSubmitting}
        />
        {errors.nombre && <div style={errorStyles}>{errors.nombre}</div>}
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="profesor" style={labelStyles}>
          Profesor a Cargo *
        </label>
        <input
          id="profesor"
          type="text"
          value={formData.profesor}
          onChange={(e) => handleChange('profesor', e.target.value)}
          style={inputStyles}
          placeholder="Ej: Dr. Juan Pérez"
          disabled={isSubmitting}
        />
        {errors.profesor && <div style={errorStyles}>{errors.profesor}</div>}
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          type="submit"
          style={buttonStyles}
          disabled={isSubmitting}
        >
          {isSubmitting ? (editSection ? 'Actualizando...' : 'Creando...') : (editSection ? 'Actualizar Sección' : 'Crear Sección')}
        </button>
        
        {onCancel && (
          <button
            type="button"
            style={cancelButtonStyles}
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </button>
        )}
      </div>

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

export default SectionForm