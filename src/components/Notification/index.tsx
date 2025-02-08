'use client'

import { Transition } from '@headlessui/react'
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { NotificationProps, NotificationType } from '@interface'

const icons: Record<NotificationType, typeof CheckCircleIcon> = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: ExclamationTriangleIcon,
  info: InformationCircleIcon,
}

const colors: Record<NotificationType, string> = {
  success: 'text-green-400',
  error: 'text-red-400',
  warning: 'text-yellow-400',
  info: 'text-blue-400',
}

export const Notification = ({ 
  title, 
  message, 
  type = 'success', 
  onClose,
  show = true
}: NotificationProps) => {
  const Icon = icons[type]

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 flex items-start justify-end px-4 py-6 sm:p-6 z-50"
    >
      <div className="flex w-full flex-col items-end space-y-4">
        <Transition
          show={show}
          appear={true}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5">
            <div className="p-4">
              <div className="flex items-center">
                <div className="shrink-0">
                  <Icon className={`size-6 ${colors[type]}`} aria-hidden="true" />
                </div>
                <div className="ml-3 w-0 flex-1">
                  {title ? (
                    <div>
                      <p className="text-sm font-medium text-gray-900">{title}</p>
                      {message && <p className="mt-1 text-sm text-gray-500">{message}</p>}
                    </div>
                  ) : (
                    message && <p className="text-sm text-gray-500">{message}</p>
                  )}
                </div>
                <div className="ml-4 flex shrink-0">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="size-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  )
}