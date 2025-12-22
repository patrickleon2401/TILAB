import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed)
  }

  const mainStyles = {
    marginLeft: isCollapsed ? '80px' : '260px',
    minHeight: '100vh',
    backgroundColor: '#343541',
    transition: 'margin-left 0.3s ease',
    display: 'flex',
    flexDirection: 'column' as const,
  }

  const contentStyles = {
    flex: 1,
    padding: '20px',
    color: '#ececf1',
  }

  return (
    <>
      <Sidebar isCollapsed={isCollapsed} onToggle={handleToggle} />
      <div style={mainStyles}>
        <div style={contentStyles}>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default MainLayout