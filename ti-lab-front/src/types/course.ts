export interface Section {
  id: string
  nombre: string
  profesor: string
  createdAt?: string
  updatedAt?: string
}

export interface Course {
  id: string
  nombre: string
  descripcion?: string
  secciones: Section[]
  createdAt?: string
  updatedAt?: string
}

export interface CreateCourseRequest {
  nombre: string
  descripcion?: string
}

export interface CreateSectionRequest {
  nombre: string
  profesor: string
  cursoId: string
}

export interface UpdateCourseRequest {
  nombre: string
  descripcion?: string
}

export interface UpdateSectionRequest {
  nombre: string
  profesor: string
}

export interface CourseFormData {
  nombre: string
  descripcion: string
}

export interface SectionFormData {
  nombre: string
  profesor: string
}

export interface CourseFormValidationErrors {
  nombre?: string
  descripcion?: string
}

export interface SectionFormValidationErrors {
  nombre?: string
  profesor?: string
}