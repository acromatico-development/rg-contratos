'use client'

import { HomeIcon, DocumentPlusIcon, FolderIcon } from '@heroicons/react/24/outline'
import { Aside } from '@components'

const DocumentsLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return <Aside items={[
        {
            name: 'Inicio',
            href: '/documents',
            icon: HomeIcon,
            current: true
        },
        {
            name: 'Contratos',
            href: '/documents/contracts',
            icon: FolderIcon,
            current: false
        },
        {
            name: 'Clausulas',
            href: '/documents/clauses',
            icon: DocumentPlusIcon,
            current: false
        },
    ]}>{children}</Aside>
}

export default DocumentsLayout