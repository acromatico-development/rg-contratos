import api from '../api';
import { IUser, IUserDTO, IAppResponse, INocoDBResponse, INocoDBResponseId } from '@interface';

const NOCODB_TABLE_NAME = '/mzoxixfs5ojoc4p/records'

export const getNextUserIdentifier = async (): Promise<IAppResponse<string>> => {
    try {
        const { data } = await api.get<INocoDBResponse<IUser[]>>(`${NOCODB_TABLE_NAME}`, {
            params: {
                sort: '-Identifier',
                limit: 1
            }
        });

        const lastIdentifier = data.list?.[0]?.Identifier || 'RG-USR-000';
        const nextNumber = parseInt(lastIdentifier.split('-')[2]) + 1;
        const nextIdentifier = `RG-USR-${nextNumber.toString().padStart(3, '0')}`;

        return {
            code: 200,
            status: 'success',
            message: 'Siguiente identificador obtenido correctamente',
            data: nextIdentifier
        }
    } catch (error: unknown) {
        console.error('Error fetching next identifier:', error);
        return {
            code: 500,
            status: 'error',
            message: 'Error al obtener el siguiente identificador',
            data: null
        }
    }
}

export const createUserNocodb = async (userData: IUserDTO): Promise<IAppResponse<IUser>> => {
    try {
        const { data } = await api.post<INocoDBResponse<IUser>>(`${NOCODB_TABLE_NAME}`, {
            UID: userData.UID,
            Email: userData.Email,
            DisplayName: userData.DisplayName || '',
            Password: userData.Password,
            Role: userData.Role,
            Identifier: userData.Identifier,
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

export const updateUserStatusNocodb = async (identifier: string, active: boolean): Promise<IAppResponse<string>> => {
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

export const readOneUserByUIDNocodb = async (uid: string): Promise<IAppResponse<IUser>> => {
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

export const readOneUserByIdentifierNocodb = async (identifier: string): Promise<IAppResponse<IUser>> => {
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
}): Promise<IAppResponse<IUser[]>> => {
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