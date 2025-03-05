import { IUser, IContract } from "@interface";

export interface IUserContract {
  Id: number;
  Title: string;
  Variables: any;
  ContractContent: string;
  User: IUser;
  ContractTemplate: IContract;
  CreatedTime: Date;
  LastModifiedTime: Date;
  CreatedAt: Date;
  UpdatedAt: Date;
}

export interface IUserContractDTO {
  Title: string;
  Variables: any;
  ContractContent: string;
  User: number;
  ContractTemplate: number;
}