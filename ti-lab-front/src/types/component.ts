export interface Component {
  id?: string
  nombre: string
  cantidad: number
  descripcion?: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateComponentRequest {
  nombre: string
  cantidad: number
  descripcion?: string
}

export interface ComponentFormData {
  nombre: string
  cantidad: string
  descripcion: string
}

export interface FormValidationErrors {
  nombre?: string
  cantidad?: string
  descripcion?: string
}