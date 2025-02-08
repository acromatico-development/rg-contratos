import api from './api';
import { comparePassword } from '@utils';
import { IContractsResponse, INocoDBResponse, IUser } from '@interface';

const route = "/mzoxixfs5ojoc4p/records";

interface IUserWithToken extends IUser {
    token?: string;
}

export const login = async (email: string, password: string): Promise<IContractsResponse<IUserWithToken>> => {
    try {
        const { data } = await api.get<INocoDBResponse<IUser[]>>(
            `${route}?where=(Email,eq,${encodeURIComponent(email)})`
        );

        if (!data.list || data.list.length === 0) {
            throw new Error('Credenciales inválidas');
        }

        const user = data.list[0];
        const isValidPassword = await comparePassword(password, user.Password || '');

        if (!isValidPassword) {
            throw new Error('Credenciales inválidas');
        }

        delete user.Password;

        return {
            code: 200,
            status: 'success',
            message: 'Usuario logueado correctamente',
            data: user
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error en el servidor';
        const errorCode = errorMessage === 'Credenciales inválidas' ? 401 : 500;

        return {
            code: errorCode,
            status: 'error',
            message: errorMessage,
            data: null
        }
    }
}