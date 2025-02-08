'use client'

import {
    CogIcon,
    UserIcon
} from '@heroicons/react/24/outline'
import { Aside } from '@components'

const SettingsLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return <Aside items={[
        {
            name: 'Configuración',
            href: '/settings',
            icon: CogIcon,
            current: true
        },
        {
            name: 'Perfil',
            href: '/settings/profile',
            icon: UserIcon,
            current: false
        },
    ]}>{children}</Aside>
}

export default SettingsLayout