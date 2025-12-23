import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { courseService } from '../services/courseService'
import type { CourseFormData, CourseFormValidationErrors } from '../types/course'

interface CourseFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

const CourseForm: React.FC<CourseFormProps> = ({ onSuccess, onCancel }) => {
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [isLoading, setIsLoading] = useState(!!editId)

  const [formData, setFormData] = useState<CourseFormData>({
    nombre: '',
    descripcion: ''
  })
  
  const [errors, setErrors] = useState<CourseFormValidationErrors>({})

  const validateField = (name: keyof CourseFormData, value: string): string | undefined => {
    switch (name) {
      case 'nombre':
        if (!value.trim()) {
          return 'El nombre del curso es obligatorio'
        }
        if (value.trim().length < 2) {
          return 'El nombre debe tener al menos 2 caracteres'
        }
        return undefined
      default:
        return undefined
    }
  }

  const validateForm = (): boolean => {
    const newErrors: CourseFormValidationErrors = {}
    let isValid = true

    Object.keys(formData).forEach((key) => {
      const fieldName = key as keyof CourseFormData
      const error = validateField(fieldName, formData[fieldName])
      if (error) {
        newErrors[fieldName] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (name: keyof CourseFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  useEffect(() => {
    const loadCourse = async () => {
      if (editId) {
        try {
          const response = await courseService.getCourseById(editId)
          if (response.success && response.data) {
            const course = response.data
            setFormData({
              nombre: course.nombre,
              descripcion: course.descripcion || ''
            })
          } else {
            setSubmitMessage({
              type: 'error',
              text: response.message || 'Error al cargar el curso para editar'
            })
          }
        } finally {
          setIsLoading(false)
        }
      }
    }

    loadCourse()
  }, [editId])

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
        descripcion: formData.descripcion.trim() || undefined
      }

      let response
      if (editId) {
        response = await courseService.updateCourse(editId, request)
      } else {
        response = await courseService.createCourse(request)
      }

      if (response.success) {
        const action = editId ? 'actualizado' : 'creado'
        setSubmitMessage({
          type: 'success',
          text: response.message || `Curso ${action} exitosamente`
        })
        if (!editId) {
          setFormData({ nombre: '', descripcion: '' })
        }
        onSuccess?.()
      } else {
        setSubmitMessage({
          type: 'error',
          text: response.message || `Error al ${editId ? 'actualizar' : 'crear'} el curso`
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '2rem',
        backgroundColor: '#2d2e3f',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
          Cargando datos del curso...
        </div>
      </div>
    )
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
      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="nombre" style={labelStyles}>
          Nombre del Curso *
        </label>
        <input
          id="nombre"
          type="text"
          value={formData.nombre}
          onChange={(e) => handleChange('nombre', e.target.value)}
          style={inputStyles}
          placeholder="Ej: Introducción a la Electrónica"
          disabled={isSubmitting}
        />
        {errors.nombre && <div style={errorStyles}>{errors.nombre}</div>}
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
          placeholder="Describe el curso, sus objetivos, contenido, etc."
          disabled={isSubmitting}
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          type="submit"
          style={buttonStyles}
          disabled={isSubmitting}
        >
          {isSubmitting ? (editId ? 'Actualizando...' : 'Creando...') : (editId ? 'Actualizar Curso' : 'Crear Curso')}
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

export default CourseForm