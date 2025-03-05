import { IClause, ClauseVariableType } from "@interface";

export interface IClauseVariable {
    Id: number;
    Identifier: string;
    Name: string;
    Label: string;
    Type: ClauseVariableType;
    DefaultValue?: string;
    ClauseId: IClause;
    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface IClauseVariableDTO {
    Identifier: string;
    Name: string;
    Label: string;
    Type: ClauseVariableType;
    DefaultValue?: string;
    nc_yz6c___Clauses_id: number;
}

export interface IClauseVariableRelations {
    ClauseId: {
        fields: string[];
    };
}

export interface IClauseVariableQueryOptions {
    fields?: string[];
    relations?: IClauseVariableRelations;
}