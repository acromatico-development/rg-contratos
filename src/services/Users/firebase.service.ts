import { IUser, IUserFirebase, IContractsResponse, IFirebaseUsersResponse } from "@interface";
import { readManyUsersNocodb } from "./nocodb.service";

export const readManyUsersFirebase = async (
    page: number = 1,
    searchTerm?: string,
    itemsPerPage: number = 20
): Promise<IContractsResponse<IFirebaseUsersResponse>> => {
    try {
        let url = `/api/users?page=${page}&itemsPerPage=${itemsPerPage}`
        if (searchTerm) {
            url += `&search=${encodeURIComponent(searchTerm)}`
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            return {
                code: 404,
                status: 'error',
                message: 'Error al obtener usuarios',
                data: null
            }
        }

        const firebaseData = await response.json() as IFirebaseUsersResponse

        const { data: nocoDBUsers } = await readManyUsersNocodb();

        if (!nocoDBUsers) {
            return {
                code: 404,
                status: 'error',
                message: 'Error al obtener usuarios de NocoDB',
                data: null
            }
        }

        const enrichedUsers = firebaseData.users.map((user: IUserFirebase) => {
            const nocoDBUser = nocoDBUsers.find((nocoUser: IUser) => nocoUser.UID === user.uid);
            return {
                ...user,
                existsInNocoDB: !!nocoDBUser,
                identifier: nocoDBUser?.Identifier
            };
        });

        return {
            code: 200,
            status: 'success',
            message: 'Usuarios obtenidos correctamente',
            data: {
                users: enrichedUsers,
                pagination: firebaseData.pagination
            }
        }
    } catch (error: unknown) {
        console.error('Error fetching users:', error);
        return {
            code: 404,
            status: 'error',
            message: 'Error al obtener usuarios',
            data: null
        }
    }
}