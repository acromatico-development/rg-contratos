'use client'

import { usePathname } from 'next/navigation'
import { HomeIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

const pathTranslations: { [key: string]: string } = {
  '': 'Inicio',
  'documents': 'Documentos',
  'contracts': 'Contratos',
  'clauses': 'Clausulas',
  "administration": "Panel de Administración",
  'users': 'Usuarios',
  'settings': 'Configuración',
  'profile': 'Perfil',
}

const Breadcrumb = () => {
  const pathname = usePathname()
  
  const paths = pathname.split('/').filter(path => path && path !== '(app)')
  
  const breadcrumbItems = paths.map((path, index) => {
    const href = '/' + paths.slice(0, index + 1).join('/')
    const isLast = index === paths.length - 1
    
    return {
      name: pathTranslations[path] || path,
      href,
      current: isLast
    }
  })

  return (
    <nav aria-label="Breadcrumb" className="flex">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
              <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
              <span className="sr-only">Inicio</span>
            </Link>
          </div>
        </li>
        {breadcrumbItems.map((item) => (
          <li key={item.href}>
            <div className="flex items-center">
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="size-5 shrink-0 text-gray-400 dark:text-gray-600"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <Link
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={`ml-4 text-sm font-medium ${
                  item.current 
                    ? 'text-gray-900 dark:text-gray-100' 
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                {item.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb