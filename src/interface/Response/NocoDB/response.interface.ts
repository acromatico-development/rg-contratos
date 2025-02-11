import { INocoDBPageInfo } from "./pageInfo.interface";

export interface INocoDBResponse<T> {
    list: T;
    pageInfo?: INocoDBPageInfo;
}

export interface INocoDBResponseId {
    Id: string;
}