'use client'

import { createContext, ReactNode } from 'react'
import { Notification } from '@components'
import { NotificationState, NotificationType } from '@interface'
import { useNotificationState } from '@hooks'

interface NotificationContextType {
    showNotification: (props: Partial<NotificationState> & { type: NotificationType }) => void
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const { notification, showNotification, hideNotification } = useNotificationState()

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            {notification && (
                <Notification 
                    {...notification} 
                    onClose={hideNotification}
                />
            )}
        </NotificationContext.Provider>
    )
}

export default NotificationProvider 