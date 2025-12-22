import { NavLink } from 'react-router-dom'
import type { SidebarProps, SidebarItem } from '../../types/sidebar'

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const menuItems: SidebarItem[] = [
    { id: '1', label: 'Registrar Componente', path: '/registrar-componente', icon: '📦' },
    { id: '2', label: 'Lista de Componentes', path: '/lista-componentes', icon: '📋' },
    { id: '3', label: 'Crear Kit', path: '/crear-kit', icon: '🧰' },
    { id: '4', label: 'Gestión de Cursos y Secciones', path: '/gestion-cursos', icon: '📚' },
    { id: '5', label: 'Gestión de Préstamos', path: '/gestion-prestamos', icon: '🔄' },
  ]

  const sidebarStyles = {
    width: isCollapsed ? '80px' : '260px',
    height: '100vh',
    backgroundColor: '#202123',
    borderRight: '1px solid #444654',
    display: 'flex',
    flexDirection: 'column' as const,
    transition: 'width 0.3s ease',
    position: 'fixed' as const,
    left: 0,
    top: 0,
    zIndex: 1000,
  }

  const headerStyles = {
    padding: isCollapsed ? '16px 12px' : '16px 20px',
    borderBottom: '1px solid #444654',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '60px',
  }

  const logoStyles = {
    color: '#ffffff',
    fontSize: isCollapsed ? '18px' : '20px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden' as const,
  }

  const toggleButtonStyles = {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
    fontSize: '18px',
    padding: '4px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const menuContainerStyles = {
    flex: 1,
    padding: isCollapsed ? '12px 8px' : '12px 16px',
    overflowY: 'auto' as const,
  }

  const menuItemStyles = (isActive: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    padding: isCollapsed ? '12px 8px' : '12px 16px',
    margin: '4px 0',
    borderRadius: '8px',
    textDecoration: 'none' as const,
    color: isActive ? '#ffffff' : '#ececf1',
    backgroundColor: isActive ? '#343541' : 'transparent',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    fontSize: '14px',
    gap: isCollapsed ? '0' : '12px',
    justifyContent: isCollapsed ? 'center' : 'flex-start',
  })

  const iconStyles = {
    fontSize: '18px',
    minWidth: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const labelStyles = {
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden' as const,
    textOverflow: 'ellipsis' as const,
  }

  const footerStyles = {
    padding: isCollapsed ? '12px 8px' : '12px 16px',
    borderTop: '1px solid #444654',
  }

  return (
    <div style={sidebarStyles}>
      <div style={headerStyles}>
        <div style={logoStyles}>
          {isCollapsed ? 'U' : 'ULIMA'}
        </div>
        <button
          style={toggleButtonStyles}
          onClick={onToggle}
          title={isCollapsed ? 'Expandir' : 'Colapsar'}
        >
          {isCollapsed ? '☰' : '☰'}
        </button>
      </div>

      <nav style={menuContainerStyles}>
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            style={({ isActive }) => menuItemStyles(isActive)}
          >
            <span style={iconStyles}>{item.icon}</span>
            {!isCollapsed && (
              <span style={labelStyles}>{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      <div style={footerStyles}>
        <NavLink
          to="/profile"
          style={({ isActive }) => menuItemStyles(isActive)}
        >
          <span style={iconStyles}>👤</span>
          {!isCollapsed && (
            <span style={labelStyles}>Perfil</span>
          )}
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar