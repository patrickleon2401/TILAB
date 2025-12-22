export interface SidebarItem {
  id: string
  label: string
  path: string
  icon: string
}

export interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}