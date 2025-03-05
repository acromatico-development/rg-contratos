import api from '../api';
import { IClause, IClauseDTO, IClauseQueryOptions, IAppResponse, INocoDBResponse, INocoDBResponseId } from '@interface';

const NOCODB_TABLE_NAME = '/mv43vlgrs1nd75k/records'

export enum ClauseIdentifierType {
    ID = 'Id',
    IDENTIFIER = 'Identifier'
}

export const getNextClauseIdentifier = async (): Promise<IAppResponse<string>> => {
    try {
        const { data } = await api.get<INocoDBResponse<IClause[]>>(`${NOCODB_TABLE_NAME}`, {
            params: {
                sort: '-Identifier',
                limit: 1,
            }
        });

        const lastIdentifier = data.list?.[0]?.Identifier;
        const nextNumber = parseInt(lastIdentifier.split('-')[2]) + 1;
        const nextIdentifier = `RG-CLA-${nextNumber.toString().padStart(3, '0')}`;

        return {
            code: 200,
            status: 'success',
            message: 'Siguiente identificador obtenido correctamente',
            data: nextIdentifier
        };
    } catch (error: unknown) {
        console.error('Error getting next identifier:', error);
        return {
            code: 500,
            status: 'error',
            message: 'Error al obtener el siguiente identificador',
            data: null
        };
    }
}

export const createClauseNocodb = async (
    input: IClauseDTO
): Promise<IAppResponse<INocoDBResponseId>> => {
    try {
        const { data } = await api.post<INocoDBResponseId>(`${NOCODB_TABLE_NAME}`, input)
        return {
            code: 200,
            status: 'success',
            message: 'Contrato creado correctamente',
            data
        }
    } catch (error: unknown) {
        console.error('Error creating contract:', error);
        return {
            code: 500,
            status: 'error',
            message: 'Error al crear contrato en NocoDB',
            data: null
        }
    }
}

export const updateClauseNocodb = async (
    id: string,
    input: IClauseDTO
): Promise<IAppResponse<INocoDBResponseId>> => {
    try {
        const { data } = await api.patch<INocoDBResponseId>(
            `${NOCODB_TABLE_NAME}`,
            {
                Id: id,
                ...input
            }
        );
        return {
            code: 200,
            status: 'success',
            message: 'Contrato actualizado correctamente',
            data
        };
    } catch (error: any) {
        return {
            code: error.response.status,
            status: "error",
            message: error.response.data.message,
            data: null,
        };
    }
};

export const updateClauseStatusNocodb = async (identifier: string, active: boolean): Promise<IAppResponse<INocoDBResponseId>> => {
    try {
        const contract = await readOneClauseNocodb("IDENTIFIER", identifier);
        if (!contract) {
            return {
                code: 404,
                status: 'error',
                message: 'Contrato no encontrado',
                data: null
            }
        }

        const { data } = await api.patch<INocoDBResponseId>(
            `${NOCODB_TABLE_NAME}`,
            {
                Id: contract.data?.Id,
                IsActive: active
            },
            {
                params: {
                    where: `(Id,eq,${contract.data?.Id})`
                }
            }
        );

        return {
            code: 200,
            status: 'success',
            message: active ? 'Contrato activado correctamente' : 'Contrato desactivado correctamente',
            data
        }
    } catch (error: unknown) {
        console.error('Error updating contract status:', error);
        return {
            code: 500,
            status: 'error',
            message: 'Error al actualizar estado del contrato',
            data: null
        }
    }
}

export const readOneClauseNocodb = async (
    type: keyof typeof ClauseIdentifierType,
    identifier: string,
    options?: IClauseQueryOptions
): Promise<IAppResponse<IClause>> => {
    try {
        const encodedIdentifier = encodeURIComponent(identifier);

        const filter = ClauseIdentifierType[type];
        const params: any = {
            where: `(${filter},eq,${encodedIdentifier})`
        };

        if (options?.fields?.length) {
            params.fields = options.fields.join(',');
        }

        if (options?.relations) {
            Object.entries(options.relations).forEach(([relation, config]) => {
                if (config.fields?.length) {
                    params[`nested[${relation}][fields]`] = config.fields.join(',');
                }
                if (config.limit) {
                    params[`nested[${relation}][limit]`] = config.limit;
                }
                if (config.offset) {
                    params[`nested[${relation}][offset]`] = config.offset;
                }
            });
        }

        const { data } = await api.get<INocoDBResponse<IClause[]>>(NOCODB_TABLE_NAME, { params });

        return {
            code: 200,
            status: 'success',
            message: 'Contrato obtenido correctamente',
            data: data.list?.[0] || null
        }
    } catch (error: unknown) {
        console.error(`Error fetching contract by ${type}:`, error);
        return {
            code: 500,
            status: 'error',
            message: `Error al obtener contrato de NocoDB`,
            data: null
        }
    }
}

interface PaginationParams {
    limit?: number;
    offset?: number;
    search?: string;
}

export const readManyClausesNocodb = async (params?: PaginationParams): Promise<IAppResponse<{
    contracts: IClause[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
    };
}>> => {
    try {
        const limit = params?.limit || 20;
        const offset = params?.offset || 0;

        let queryString = `${NOCODB_TABLE_NAME}?limit=${limit}&offset=${offset}`;
        queryString += '&shuffle=0';
        queryString += '&nested[UserClauses][offset]=0';
        queryString += '&nested[UserClauses][limit]=25';
        queryString += '&nested[CreatedByUserId][fields]=Id,Name,Email';

        if (params?.search) {
            const searchValue = encodeURIComponent(params.search);
            queryString += `&where=(Name,like,%25${searchValue}%25)`;
            queryString += `~or(Identifier,like,%25${searchValue}%25)`;
            queryString += `~or(Description,like,%25${searchValue}%25)`;
        }

        const { data } = await api.get<INocoDBResponse<IClause[]>>(queryString);

        return {
            code: 200,
            status: 'success',
            message: 'Contratos obtenidos correctamente',
            data: {
                contracts: data.list || [],
                pagination: {
                    currentPage: Math.floor(offset / limit) + 1,
                    totalPages: Math.ceil((data.pageInfo?.totalRows || 0) / limit),
                    totalItems: data.pageInfo?.totalRows || 0,
                    itemsPerPage: limit
                }
            }
        }
    } catch (error: unknown) {
        console.error('Error fetching contracts:', error);
        return {
            code: 500,
            status: 'error',
            message: 'Error al obtener contratos de NocoDB',
            data: null
        }
    }
}

export const deleteClauseNocodb = async (id: string): Promise<IAppResponse<INocoDBResponseId>> => {
    try {
        const { data } = await api.delete<INocoDBResponseId>(`${NOCODB_TABLE_NAME}/${id}`);
        return {
            code: 200,
            status: 'success',
            message: 'Contrato eliminado correctamente',
            data
        }
    } catch (error: any) {
        console.error('Error deleting contract:', error);
        return {
            code: error.response.status,
            status: "error",
            message: error.response.data.message,
            data: null,
        };
    }
}