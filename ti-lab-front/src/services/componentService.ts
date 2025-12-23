import type { Component, CreateComponentRequest } from '../types/component'

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message: string
}

export class ComponentService {
  // Reserved for future API integration
  // private readonly baseUrl = '/api/components'

  async createComponent(request: CreateComponentRequest): Promise<ApiResponse<Component>> {
    try {
      // Mock implementation - replace with actual API call
      const newComponent: Component = {
        id: this.generateId(),
        nombre: request.nombre,
        cantidad: request.cantidad,
        descripcion: request.descripcion,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      // Simulate API delay
      await this.simulateDelay(1000)

      // Simulate random errors for testing
      if (Math.random() < 0.1) {
        return {
          success: false,
          message: 'Error del servidor al registrar el componente'
        }
      }

      // Mock localStorage storage for development
      this.storeComponent(newComponent)

      return {
        success: true,
        data: newComponent,
        message: 'Componente registrado exitosamente'
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error desconocido'
      }
    }
  }

  async getAllComponents(): Promise<ApiResponse<Component[]>> {
    try {
      // Mock implementation - replace with actual API call
      await this.simulateDelay(500)
      
      const components = this.getStoredComponents()

      return {
        success: true,
        data: components,
        message: 'Componentes obtenidos exitosamente'
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error desconocido'
      }
    }
  }

  async getComponentById(id: string): Promise<ApiResponse<Component>> {
    try {
      // Mock implementation - replace with actual API call
      await this.simulateDelay(300)
      
      const components = this.getStoredComponents()
      const component = components.find(c => c.id === id)

      if (!component) {
        return {
          success: false,
          message: 'Componente no encontrado'
        }
      }

      return {
        success: true,
        data: component,
        message: 'Componente obtenido exitosamente'
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error desconocido'
      }
    }
  }

  async updateComponent(id: string, request: CreateComponentRequest): Promise<ApiResponse<Component>> {
    try {
      // Mock implementation - replace with actual API call
      const components = this.getStoredComponents()
      const index = components.findIndex(c => c.id === id)

      if (index === -1) {
        return {
          success: false,
          message: 'Componente no encontrado'
        }
      }

      const updatedComponent: Component = {
        ...components[index],
        nombre: request.nombre,
        cantidad: request.cantidad,
        descripcion: request.descripcion,
        updatedAt: new Date().toISOString()
      }

      components[index] = updatedComponent
      localStorage.setItem('components', JSON.stringify(components))

      // Simulate API delay
      await this.simulateDelay(1000)

      return {
        success: true,
        data: updatedComponent,
        message: 'Componente actualizado exitosamente'
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error desconocido'
      }
    }
  }

  async deleteComponent(id: string): Promise<ApiResponse<void>> {
    try {
      // Mock implementation - replace with actual API call
      const components = this.getStoredComponents()
      const index = components.findIndex(c => c.id === id)

      if (index === -1) {
        return {
          success: false,
          message: 'Componente no encontrado'
        }
      }

      components.splice(index, 1)
      localStorage.setItem('components', JSON.stringify(components))

      // Simulate API delay
      await this.simulateDelay(800)

      return {
        success: true,
        message: 'Componente eliminado exitosamente'
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error desconocido'
      }
    }
  }

  private generateId(): string {
    return `comp_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
  }

  private simulateDelay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // Mock storage for development
  private storeComponent(component: Component): void {
    const existing = this.getStoredComponents()
    existing.push(component)
    localStorage.setItem('components', JSON.stringify(existing))
  }

  private getStoredComponents(): Component[] {
    const stored = localStorage.getItem('components')
    
    // Initialize with mock data if empty
    if (!stored) {
      const mockData: Component[] = [
        {
          id: 'comp_1',
          nombre: 'Resistencia 10k Ω',
          cantidad: 150,
          descripcion: 'Resistencia de carbón 1/4W tolerancia 5%',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'comp_2',
          nombre: 'LED Rojo 5mm',
          cantidad: 75,
          descripcion: 'LED de alta intensidad rojo 5mm 20mA',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'comp_3',
          nombre: 'Arduino Uno R3',
          cantidad: 12,
          descripcion: 'Placa de desarrollo Arduino Uno R3',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'comp_4',
          nombre: 'Protoboard 830 puntos',
          cantidad: 25,
          descripcion: 'Protoboard sin soldadura 830 puntos',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'comp_5',
          nombre: 'Servomotor SG90',
          cantidad: 30,
          descripcion: 'Servomotor micro SG90 9g 180°',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
      localStorage.setItem('components', JSON.stringify(mockData))
      return mockData
    }
    
    return JSON.parse(stored)
  }
}

// Singleton instance
export const componentService = new ComponentService()