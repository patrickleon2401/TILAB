import React from 'react'

interface ConfirmationModalProps {
  isOpen: boolean
  title: string
  message: string
  confirmText: string
  cancelText: string
  onConfirm: () => void
  onCancel: () => void
  isConfirming?: boolean
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  isConfirming = false
}) => {
  if (!isOpen) return null

  const modalOverlayStyles = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  }

  const modalStyles = {
    backgroundColor: '#2d2e3f',
    borderRadius: '8px',
    padding: '2rem',
    minWidth: '400px',
    maxWidth: '90%',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    border: '1px solid #4a4b5e'
  }

  const titleStyles = {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#ececf1'
  }

  const messageStyles = {
    fontSize: '1rem',
    color: '#9ca3af',
    marginBottom: '2rem',
    lineHeight: '1.5'
  }

  const buttonContainerStyles = {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end'
  }

  const buttonStyles = (isPrimary: boolean = false, isLoading: boolean = false) => ({
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    opacity: isLoading ? 0.7 : 1,
    transition: 'all 0.2s ease',
    backgroundColor: isPrimary ? (isLoading ? '#6b7280' : '#ef4444') : '#4b5563',
    color: '#ffffff'
  })

  return (
    <div style={modalOverlayStyles}>
      <div style={modalStyles}>
        <h2 style={titleStyles}>{title}</h2>
        <p style={messageStyles}>{message}</p>
        <div style={buttonContainerStyles}>
          <button
            style={buttonStyles(false, false)}
            onClick={onCancel}
            disabled={isConfirming}
          >
            {cancelText}
          </button>
          <button
            style={buttonStyles(true, isConfirming)}
            onClick={onConfirm}
            disabled={isConfirming}
          >
            {isConfirming ? 'Eliminando...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal