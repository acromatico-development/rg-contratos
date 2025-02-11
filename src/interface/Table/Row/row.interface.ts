import { IMenuItem } from '../menuItem.interface';
import { IIdentifierRow, ISingleRow, IDoubleRow, IStatusRow } from './index';

export type RowType = {
    type: 'single';
    data: ISingleRow;
} | {
    type: 'double';
    data: IDoubleRow;
} | {
    type: 'status';
    data: IStatusRow;
};

export interface ITableRow {
    identifier: IIdentifierRow;
    rows: RowType[];
    menuItems?: IMenuItem[];
} 