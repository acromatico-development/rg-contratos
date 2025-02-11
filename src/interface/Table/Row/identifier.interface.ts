import { ITextRow } from "./text.interface";

export interface IIdentifierRow {
    imgUrl?: string;
    text: ITextRow
    subText?: string;
    link?: string;
}