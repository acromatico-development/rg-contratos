'use client'

import { useState, useCallback, useContext } from 'react'
import { NotificationState, NotificationType } from '@interface'
import { NotificationContext } from '@context/NotificationContext'

export function useNotificationState() {
    const [notification, setNotification] = useState<(NotificationState & { show: boolean }) | null>(null)
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

    const showNotification = useCallback(({ 
        title, 
        message, 
        type = 'success' 
    }: Partial<NotificationState> & { type: NotificationType }) => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        setNotification({ title, message, type, show: true })

        const newTimeoutId = setTimeout(() => {
            setNotification(prev => prev ? { ...prev, show: false } : null)
            
            setTimeout(() => {
                setNotification(null)
            }, 300)
        }, 5000)

        setTimeoutId(newTimeoutId)
    }, [timeoutId])

    const hideNotification = useCallback(() => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        setNotification(prev => prev ? { ...prev, show: false } : null)
        
        setTimeout(() => {
            setNotification(null)
        }, 300)
    }, [timeoutId])

    return { notification, showNotification, hideNotification }
}

export function useNotification() {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider')
    }
    return context
} 