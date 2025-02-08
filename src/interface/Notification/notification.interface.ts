export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export interface NotificationState {
    title?: string
    message?: string
    type: NotificationType
}

export interface NotificationProps extends NotificationState {
    onClose: () => void
    show: boolean
} 