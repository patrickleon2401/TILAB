import ComponentForm from '../components/ComponentForm'

const RegistrarComponente = () => {
  const pageStyles = {
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
    marginBottom: '2rem',
    maxWidth: '800px'
  }

  return (
    <div style={pageStyles}>
      <h1 style={titleStyles}>Registrar Componente</h1>
      <p style={subtitleStyles}>
        Agrega nuevos componentes al inventario del laboratorio. 
        Ingresa la información básica como nombre, cantidad disponible y una descripción opcional.
      </p>
      <ComponentForm />
    </div>
  )
}

export default RegistrarComponente