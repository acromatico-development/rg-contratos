import { NextResponse } from 'next/server'
import { adminAuth } from '@config'
import { IUserFirebase } from '@interface'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const itemsPerPage = parseInt(searchParams.get('itemsPerPage') || '20')
        const searchTerm = searchParams.get('search') || ''

        let allUsers: IUserFirebase[] = []
        let nextPageToken: string | undefined

        try {
            const batchSize = 1000
            
            do {
                const result = await adminAuth.listUsers(batchSize, nextPageToken)
                const mappedUsers: IUserFirebase[] = result.users.map(user => ({
                    uid: user.uid,
                    email: user.email || null,
                    displayName: user.displayName || null,
                    emailVerified: user.emailVerified,
                    photoURL: user.photoURL || null,
                    phoneNumber: user.phoneNumber || null,
                    disabled: user.disabled
                }))
                allUsers = [...allUsers, ...mappedUsers]
                nextPageToken = result.pageToken
            } while (nextPageToken)

        } catch (error: unknown) {
            console.error('Error fetching users:', error)
            return NextResponse.json(
                { error: 'Error al obtener usuarios' },
                { status: 500 }
            )
        }

        let filteredUsers = allUsers
        if (searchTerm) {
            filteredUsers = allUsers.filter(user =>
                user.uid.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
            )
        }

        const totalItems = filteredUsers.length
        const totalPages = Math.ceil(totalItems / itemsPerPage)
        const startIndex = (page - 1) * itemsPerPage
        const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

        const response = {
            users: paginatedUsers.map(({
                uid,
                email,
                emailVerified,
                displayName,
                photoURL,
                phoneNumber,
                disabled
            }) => ({
                uid,
                email,
                emailVerified,
                displayName,
                photoURL,
                phoneNumber,
                disabled
            })),
            pagination: {
                currentPage: page,
                totalPages,
                totalItems,
                itemsPerPage
            }
        }

        return NextResponse.json(response)
    } catch (error: unknown) {
        console.error('Error fetching users:', error)
        return NextResponse.json(
            { error: 'Error al obtener usuarios' },
            { status: 500 }
        )
    }
} 