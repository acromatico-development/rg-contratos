'use client'

import { createContext, ReactNode, useState, useCallback } from 'react'
import { Modal } from '@components'

interface ModalContextType {
    showModal: (content: ReactNode, options?: { title?: string; maxWidth?: 'sm' | 'md' | 'lg' | 'xl' }) => void
    hideModal: () => void
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modalContent, setModalContent] = useState<ReactNode | null>(null)
    const [modalOptions, setModalOptions] = useState<{ title?: string; maxWidth?: 'sm' | 'md' | 'lg' | 'xl' }>({})
    const [isOpen, setIsOpen] = useState(false)

    const showModal = useCallback((content: ReactNode, options = {}) => {

        setIsOpen(true)
        setModalContent(content)
        setModalOptions(options)
    }, [])

    const hideModal = useCallback(() => {
        setIsOpen(false)
        setTimeout(() => {
            setModalContent(null)
            setModalOptions({})
        }, 300)
    }, [])

    return (
        <ModalContext.Provider value={{ showModal, hideModal }}>
            {children}
            <Modal
                isOpen={isOpen}
                onClose={hideModal}
                title={modalOptions.title}
                maxWidth={modalOptions.maxWidth}
            >
                {modalContent}
            </Modal>
        </ModalContext.Provider>
    )
} 