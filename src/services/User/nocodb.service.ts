import api from '../api';
import { IContractsResponse, INocoDBResponseId, INocoDBResponse, IUser } from '@interface';

const NOCODB_TABLE_NAME = '/mzoxixfs5ojoc4p/records'

export const createUserNocodb = async (userData: {
    uid: string
    email: string
    displayName?: string
    identifier: string
    password: string
    role: 'ADMIN' | 'USER'
}): Promise<IContractsResponse<IUser>> => {
    try {
        const { data } = await api.post<INocoDBResponse<IUser>>(`${NOCODB_TABLE_NAME}`, {
            UID: userData.uid,
            Email: userData.email,
            Name: userData.displayName || '',
            Password: userData.password,
            Role: userData.role,
            Identifier: userData.identifier,
        })
        return {
            code: 200,
            status: 'success',
            message: 'Usuario creado correctamente',
            data: data.list
        }
    } catch (error: unknown) {
        console.error('Error creating user:', error);
        return {
            code: 500,
            status: 'error',
            message: 'Error al crear usuario en NocoDB',
            data: null
        }
    }
}

export const updateUserStatusNocodb = async (identifier: string, active: boolean): Promise<IContractsResponse<string>> => {
    try {
        const user = await readOneUserByIdentifierNocodb(identifier);
        if (!user) {
            return {
                code: 404,
                status: 'error',
                message: 'Usuario no encontrado',
                data: null
            }
        }

        const { data } = await api.patch<INocoDBResponseId>(
            `${NOCODB_TABLE_NAME}`,
            {
                Id: user.data?.Id,
                IsActive: active
            },
            {
                params: {
                    where: `(Id,eq,${user.data?.Id})`
                }
            }
        );

        return {
            code: 200,
            status: 'success',
            message: active ? 'Usuario activado correctamente' : 'Usuario desactivado correctamente',
            data: data.Id
        }
    } catch (error: unknown) {
        console.error('Error updating user status:', error);
        return {
            code: 500,
            status: 'error',
            message: 'Error al actualizar estado del usuario',
            data: null
        }
    }
}

export const getLastIdentifierNocodb = async (): Promise<IContractsResponse<string>> => {
    try {
        const {
            data
        } = await readManyUsersNocodb({
            sort: 'Identifier',
            order: 'desc',
            limit: 1
        })

        if (!data || data.length === 1) {
            return {
                code: 200,
                status: 'info',
                message: 'No hay usuarios en NocoDB',
                data: 'RGC-0001'
            }
        }

        const lastUser = data[0];

        const currentNumber = parseInt(lastUser.Identifier.split('-')[1]);
        const nextNumber = currentNumber + 1;
        return {
            code: 200,
            status: 'success',
            message: 'Último identificador obtenido correctamente',
            data: `RGC-${nextNumber.toString().padStart(4, '0')}`
        }
    } catch (error: unknown) {
        console.error('Error fetching last identifier:', error);
        return {
            code: 500,
            status: 'error',
            message: 'Error al obtener último identificador',
            data: 'RGC-0001'
        }
    }
}

export const readOneUserByUIDNocodb = async (uid: string): Promise<IContractsResponse<IUser>> => {
    try {
        const { data } = await api.get<INocoDBResponse<IUser[]>>(`${NOCODB_TABLE_NAME}`, {
            params: {
                where: `(UID,eq,${uid})`
            }
        });
        return {
            code: 200,
            status: 'success',
            message: 'Usuario obtenido correctamente',
            data: data.list?.[0] || null
        }
    } catch (error: unknown) {
        console.error('Error fetching user by UID:', error);
        return {
            code: 500,
            status: 'error',
            message: 'Error al obtener usuario de NocoDB',
            data: null
        }
    }
}

export const readOneUserByIdentifierNocodb = async (identifier: string): Promise<IContractsResponse<IUser>> => {
    try {
        const { data } = await api.get<INocoDBResponse<IUser[]>>(`${NOCODB_TABLE_NAME}`, {
            params: {
                where: `(Identifier,eq,${identifier})`
            }
        });
        return {
            code: 200,
            status: 'success',
            message: 'Usuario obtenido correctamente',
            data: data.list?.[0] || null
        }
    } catch (error: unknown) {
        console.error('Error fetching user by identifier:', error);
        return {
            code: 500,
            status: 'error',
            message: 'Error al obtener usuario de NocoDB',
            data: null
        }
    }
}

type QueryParams = {
    fields?: string;
    sort?: string;
    limit?: number;
}

export const readManyUsersNocodb = async (params?: {
    sort?: 'Identifier',
    order?: 'asc' | 'desc',
    limit?: number
}): Promise<IContractsResponse<IUser[]>> => {
    try {
        const queryParams: QueryParams = {
            'fields': '*'
        };

        if (params?.sort) {
            queryParams['sort'] = `${params.order === "desc" ? "-" : ""}${params.sort}`
        }

        if (params?.limit) {
            queryParams['limit'] = params.limit;
        }

        const { data } = await api.get<INocoDBResponse<IUser[]>>(`${NOCODB_TABLE_NAME}`, {
            params: queryParams
        });
        return {
            code: 200,
            status: 'success',
            message: 'Usuarios obtenidos correctamente',
            data: data.list || []
        }
    } catch (error: unknown) {
        console.error('Error fetching users:', error);
        return {
            code: 500,
            status: 'error',
            message: 'Error al obtener usuarios de NocoDB',
            data: null
        }
    }
}