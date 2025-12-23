import type { ApiResponse } from './componentService'
import type { Section, CreateSectionRequest, UpdateSectionRequest } from '../types/course'
import { courseService } from './courseService'

export class SectionService {
  // Reserved for future API integration
  // private readonly baseUrl = '/api/sections'

  async getSectionsByCourseId(cursoId: string): Promise<ApiResponse<Section[]>> {
    try {
      // Mock implementation - replace with actual API call
      await this.simulateDelay(300)
      
      const courseResponse = await courseService.getCourseById(cursoId)
      if (!courseResponse.success) {
        return {
          success: false,
          message: courseResponse.message || 'Error al obtener las secciones'
        }
      }

      return {
        success: true,
        data: courseResponse.data!.secciones,
        message: 'Secciones obtenidas exitosamente'
      }
    } catch {
      return {
        success: false,
        message: 'Error desconocido'
      }
    }
  }

  async createSection(request: CreateSectionRequest): Promise<ApiResponse<Section>> {
    try {
      // Mock implementation - replace with actual API call
      const courseResponse = await courseService.getCourseById(request.cursoId)
      if (!courseResponse.success) {
        return {
          success: false,
          message: 'Curso no encontrado'
        }
      }

      const course = courseResponse.data!
      const newSection: Section = {
        id: this.generateId(),
        nombre: request.nombre,
        profesor: request.profesor,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      course.secciones.push(newSection)
      
      // Update course with new section
      const updateResponse = await courseService.updateCourse(course.id, {
        nombre: course.nombre,
        descripcion: course.descripcion
      })

      if (!updateResponse.success) {
        return {
          success: false,
          message: 'Error al agregar la sección al curso'
        }
      }

      // Simulate API delay
      await this.simulateDelay(1000)

      return {
        success: true,
        data: newSection,
        message: 'Sección creada exitosamente'
      }
    } catch {
      return {
        success: false,
        message: 'Error desconocido'
      }
    }
  }

  async updateSection(cursoId: string, sectionId: string, request: UpdateSectionRequest): Promise<ApiResponse<Section>> {
    try {
      // Mock implementation - replace with actual API call
      const courseResponse = await courseService.getCourseById(cursoId)
      if (!courseResponse.success) {
        return {
          success: false,
          message: 'Curso no encontrado'
        }
      }

      const course = courseResponse.data!
      const sectionIndex = course.secciones.findIndex(s => s.id === sectionId)

      if (sectionIndex === -1) {
        return {
          success: false,
          message: 'Sección no encontrada'
        }
      }

      const updatedSection: Section = {
        ...course.secciones[sectionIndex],
        nombre: request.nombre,
        profesor: request.profesor,
        updatedAt: new Date().toISOString()
      }

      course.secciones[sectionIndex] = updatedSection
      
      // Update course with updated section
      await courseService.updateCourse(course.id, {
        nombre: course.nombre,
        descripcion: course.descripcion
      })

      // Simulate API delay
      await this.simulateDelay(1000)

      return {
        success: true,
        data: updatedSection,
        message: 'Sección actualizada exitosamente'
      }
    } catch {
      return {
        success: false,
        message: 'Error desconocido'
      }
    }
  }

  async deleteSection(cursoId: string, sectionId: string): Promise<ApiResponse<void>> {
    try {
      // Mock implementation - replace with actual API call
      const courseResponse = await courseService.getCourseById(cursoId)
      if (!courseResponse.success) {
        return {
          success: false,
          message: 'Curso no encontrado'
        }
      }

      const course = courseResponse.data!
      const sectionIndex = course.secciones.findIndex(s => s.id === sectionId)

      if (sectionIndex === -1) {
        return {
          success: false,
          message: 'Sección no encontrada'
        }
      }

      course.secciones.splice(sectionIndex, 1)
      
      // Update course without the deleted section
      await courseService.updateCourse(course.id, {
        nombre: course.nombre,
        descripcion: course.descripcion
      })

      // Simulate API delay
      await this.simulateDelay(800)

      return {
        success: true,
        message: 'Sección eliminada exitosamente'
      }
    } catch {
      return {
        success: false,
        message: 'Error desconocido'
      }
    }
  }

  private generateId(): string {
    return `section_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
  }

  private simulateDelay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

// Singleton instance
export const sectionService = new SectionService()