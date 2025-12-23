import type { ApiResponse } from '../services/componentService'
import type { Course, CreateCourseRequest, UpdateCourseRequest } from '../types/course'

export class CourseService {
  // Reserved for future API integration
  // private readonly baseUrl = '/api/courses'

  async getAllCourses(): Promise<ApiResponse<Course[]>> {
    try {
      // Mock implementation - replace with actual API call
      await this.simulateDelay(500)
      
      const courses = this.getStoredCourses()

      return {
        success: true,
        data: courses,
        message: 'Cursos obtenidos exitosamente'
      }
    } catch {
      return {
        success: false,
        message: 'Error desconocido'
      }
    }
  }

  async getCourseById(id: string): Promise<ApiResponse<Course>> {
    try {
      // Mock implementation - replace with actual API call
      await this.simulateDelay(300)
      
      const courses = this.getStoredCourses()
      const course = courses.find(c => c.id === id)

      if (!course) {
        return {
          success: false,
          message: 'Curso no encontrado'
        }
      }

      return {
        success: true,
        data: course,
        message: 'Curso obtenido exitosamente'
      }
    } catch {
      return {
        success: false,
        message: 'Error desconocido'
      }
    }
  }

  async createCourse(request: CreateCourseRequest): Promise<ApiResponse<Course>> {
    try {
      // Mock implementation - replace with actual API call
      const courses = this.getStoredCourses()
      
      const newCourse: Course = {
        id: this.generateId(),
        nombre: request.nombre,
        descripcion: request.descripcion,
        secciones: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      courses.push(newCourse)
      localStorage.setItem('courses', JSON.stringify(courses))

      // Simulate API delay
      await this.simulateDelay(1000)

      return {
        success: true,
        data: newCourse,
        message: 'Curso creado exitosamente'
      }
    } catch {
      return {
        success: false,
        message: 'Error desconocido'
      }
    }
  }

  async updateCourse(id: string, request: UpdateCourseRequest): Promise<ApiResponse<Course>> {
    try {
      // Mock implementation - replace with actual API call
      const courses = this.getStoredCourses()
      const index = courses.findIndex(c => c.id === id)

      if (index === -1) {
        return {
          success: false,
          message: 'Curso no encontrado'
        }
      }

      const updatedCourse: Course = {
        ...courses[index],
        nombre: request.nombre,
        descripcion: request.descripcion,
        updatedAt: new Date().toISOString()
      }

      courses[index] = updatedCourse
      localStorage.setItem('courses', JSON.stringify(courses))

      // Simulate API delay
      await this.simulateDelay(1000)

      return {
        success: true,
        data: updatedCourse,
        message: 'Curso actualizado exitosamente'
      }
    } catch {
      return {
        success: false,
        message: 'Error desconocido'
      }
    }
  }

  async deleteCourse(id: string): Promise<ApiResponse<void>> {
    try {
      // Mock implementation - replace with actual API call
      const courses = this.getStoredCourses()
      const index = courses.findIndex(c => c.id === id)

      if (index === -1) {
        return {
          success: false,
          message: 'Curso no encontrado'
        }
      }

      courses.splice(index, 1)
      localStorage.setItem('courses', JSON.stringify(courses))

      // Simulate API delay
      await this.simulateDelay(800)

      return {
        success: true,
        message: 'Curso eliminado exitosamente'
      }
    } catch {
      return {
        success: false,
        message: 'Error desconocido'
      }
    }
  }

  private generateId(): string {
    return `course_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
  }

  private simulateDelay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  private getStoredCourses(): Course[] {
    const stored = localStorage.getItem('courses')
    
    // Initialize with mock data if empty
    if (!stored) {
      const mockData: Course[] = [
        {
          id: 'course_1',
          nombre: 'Introducción a la Electrónica',
          descripcion: 'Curso básico de conceptos fundamentales de electrónica',
          secciones: [
            {
              id: 'sec_1',
              nombre: 'Sección 1',
              profesor: 'Dr. Juan Pérez',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            },
            {
              id: 'sec_2',
              nombre: 'Sección 2',
              profesor: 'Ing. María González',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'course_2',
          nombre: 'Programación con Arduino',
          descripcion: 'Curso práctico de programación y prototipado con Arduino',
          secciones: [
            {
              id: 'sec_3',
              nombre: 'Sección A',
              profesor: 'MSc. Carlos Rodríguez',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'course_3',
          nombre: 'Robótica Básica',
          descripcion: 'Introducción a la robótica y automatización',
          secciones: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
      localStorage.setItem('courses', JSON.stringify(mockData))
      return mockData
    }
    
    return JSON.parse(stored)
  }
}

// Singleton instance
export const courseService = new CourseService()