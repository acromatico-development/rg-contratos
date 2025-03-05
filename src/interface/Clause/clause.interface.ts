import { IUser, IContractClause, IClauseVariable } from "@interface";

export interface IClause {
  Id: number;
  Identifier: string;
  Name: string;
  Description: string;
  Content: string;
  IsTemplate: boolean;
  CreatedByUserId?: IUser;
  ContractClausesId: IContractClause[];
  ClauseVariablesId: IClauseVariable[];
  CreatedAt: Date;
  UpdatedAt: Date;
}

export interface IClauseDTO {
  Name: string;
  Description?: string;
  Content: string;
  IsTemplate: boolean;
  nc_yz6c___Users_id: number;
}

export interface IClauseRelations {
  CreatedByUserId?: {
    fields?: string[];
  };
  ClauseVariablesId?: {
    fields?: string[];
    limit?: number;
    offset?: number;
  };
  ContractClausesId?: {
    fields?: string[];
    limit?: number;
    offset?: number;
  };
}

export interface IClauseQueryOptions {
  fields?: string[];
  relations?: IClauseRelations;
}