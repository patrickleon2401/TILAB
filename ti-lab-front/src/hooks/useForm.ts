import { useState } from 'react'
import type { ComponentFormData, FormValidationErrors } from '../types/component'

export const useForm = (initialState: ComponentFormData) => {
  const [formData, setFormData] = useState<ComponentFormData>(initialState)
  const [errors, setErrors] = useState<FormValidationErrors>({})

  const validateField = (name: keyof ComponentFormData, value: string): string | undefined => {
    switch (name) {
      case 'nombre':
        if (!value.trim()) {
          return 'El nombre del componente es obligatorio'
        }
        if (value.trim().length < 2) {
          return 'El nombre debe tener al menos 2 caracteres'
        }
        return undefined

      case 'cantidad': {
        const numValue = value.trim()
        if (!numValue) {
          return 'La cantidad es obligatoria'
        }
        const parsedValue = parseInt(numValue, 10)
        if (isNaN(parsedValue)) {
          return 'Debe ser un número válido'
        }
        if (parsedValue < 0) {
          return 'La cantidad no puede ser negativa'
        }
        return undefined
      }

      case 'descripcion':
        return undefined

      default:
        return undefined
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormValidationErrors = {}
    let isValid = true

    Object.keys(formData).forEach((key) => {
      const fieldName = key as keyof ComponentFormData
      const error = validateField(fieldName, formData[fieldName])
      if (error) {
        newErrors[fieldName] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (name: keyof ComponentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const resetForm = () => {
    setFormData(initialState)
    setErrors({})
  }

  return {
    formData,
    errors,
    handleChange,
    validateForm,
    resetForm,
    setFormData,
    setErrors
  }
}