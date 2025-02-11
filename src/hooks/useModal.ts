'use client'

import { useContext } from 'react'
import { ModalContext } from '@context/ModalContext'

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    console.error('useModal must be used within a ModalProvider')
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
} 