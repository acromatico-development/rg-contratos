'use client'

import { HomeIcon, UsersIcon } from '@heroicons/react/24/outline'
import { Aside } from '@components'

const AdministrationLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return <Aside items={[
        {
            name: 'Inicio',
            href: '/administration',
            icon: HomeIcon
        },
        {
            name: 'Usuarios',
            href: '/administration/users',
            icon: UsersIcon
        },
    ]}>{children}</Aside>
}

export default AdministrationLayout