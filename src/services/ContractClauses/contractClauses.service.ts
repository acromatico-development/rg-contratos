import api from '../api';
import { IContractClause, IContractClauseDTO, IContractClauseQueryOptions, IAppResponse, INocoDBResponse, INocoDBResponseId } from "@interface";

const NOCODB_TABLE_NAME = "/m85ihqp1xszcfwr/records";

export enum ContractClauseIdentifierType {
  ID = 'Id',
  IDENTIFIER = 'Identifier'
}

export const getNextContractClauseIdentifier = async (): Promise<IAppResponse<string>> => {
  try {
    const { data } = await api.get<INocoDBResponse<IContractClause[]>>(`${NOCODB_TABLE_NAME}`, {
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

export const createContractClauseNocodb = async (
  input: IContractClauseDTO
): Promise<IAppResponse<INocoDBResponseId>> => {
  try {
    const { data } = await api.post<INocoDBResponseId>(`${NOCODB_TABLE_NAME}`, input);
    return {
      code: 200,
      status: 'success',
      message: 'Contrato creado correctamente',
      data
    }
  } catch (error: any) {
    return {
      code: error.response.status,
      status: "error",
      message: error.response.data.message,
      data: null,
    };
  }
};

export const updateContractClauseNocodb = async (
  id: string,
  input: IContractClauseDTO
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
    }
  } catch (error: any) {
    return {
      code: error.response.status,
      status: "error",
      message: error.response.data.message,
      data: null,
    };
  }
};

export const readOneContractClauseNocodb = async (
  type: keyof typeof ContractClauseIdentifierType,
  identifier: string,
  options?: IContractClauseQueryOptions
): Promise<IAppResponse<IContractClause>> => {
  try {
    const encodedIdentifier = encodeURIComponent(identifier);

    const filter = ContractClauseIdentifierType[type];
    const params: any = {
      where: `(${filter},eq,${encodedIdentifier})`
    };

    if (options?.fields?.length) {
      params.fields = options.fields.join(',');
    }

    if (options?.relations) {
      Object.entries(options.relations).forEach(([relation, config]) => {
        params[`nested[${relation}][fields]`] = config.fields.join(',');
      });
    }

    const { data } = await api.get<INocoDBResponse<IContractClause[]>>(NOCODB_TABLE_NAME, { params });

    return {
      code: 200,
      status: 'success',
      message: 'Contratos obtenidos correctamente',
      data: data.list?.[0] || null
    }
  } catch (error: any) {
    return {
      code: error.response.status,
      status: "error",
      message: error.response.data.message,
      data: null,
    };
  }
};

interface PaginationParams {
  limit?: number;
  offset?: number;
  search?: string;
}

export const readManyContractClauses = async (params?: PaginationParams): Promise<IAppResponse<{
  contracts: IContractClause[];
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
    queryString += '&nested[ContractClauses][offset]=0';
    queryString += '&nested[ContractClauses][limit]=25';
    queryString += '&nested[CreatedByUserId][fields]=Id,Name,Email';

    if (params?.search) {
      const searchValue = encodeURIComponent(params.search);
      queryString += `&where=(Name,like,%25${searchValue}%25)`;
      queryString += `~or(Identifier,like,%25${searchValue}%25)`;
      queryString += `~or(Description,like,%25${searchValue}%25)`;
    }

    const { data } = await api.get<INocoDBResponse<IContractClause[]>>(queryString);

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
  } catch (error: any) {
    return {
      code: 500,
      status: 'error',
      message: 'Error al obtener contratos de NocoDB',
      data: null
    };
  }
};

export const deleteContractClauseNocodb = async (
  id: string
): Promise<IAppResponse<INocoDBResponseId>> => {
  try {
    const { data } = await api.delete<INocoDBResponseId>(`${NOCODB_TABLE_NAME}/${id}`);
    return {
      code: 200,
      status: 'success',
      message: 'Contrato eliminado correctamente',
      data
    }
  } catch (error: any) {
    return {
      code: error.response.status,
      status: "error",
      message: error.response.data.message,
      data: null,
    };
  }
};

export const readContractClauseByContractId = async (
  contractId: string
): Promise<IAppResponse<IContractClause[]>> => {
  try {
    const queryParams = new URLSearchParams({
      where: `(nc_yz6c__Contracts_id,eq,${contractId})`,
      sort: 'Order',
      'nested[ClauseId][fields]': 'Id,Identifier,Name'
    });

    const { data } = await api.get<INocoDBResponse<IContractClause[]>>(`${NOCODB_TABLE_NAME}?${queryParams}`);
    console.log(data);
    return {
      code: 200,
      status: 'success',
      message: 'Contratos obtenidos correctamente',
      data: data.list || []
    }
  } catch (error: any) {
    return {
      code: 500,
      status: 'error',
      message: 'Error al obtener contratos de NocoDB',
      data: null
    }
  }
};
