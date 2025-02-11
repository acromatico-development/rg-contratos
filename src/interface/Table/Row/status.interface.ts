import { ITextRow } from "./text.interface";

export type TStatusColor = 'green' | 'red' | 'yellow' | 'blue' | 'purple' | 'pink' | 'gray';

export interface IStatusRow {
    text: ITextRow
    color: TStatusColor;
}