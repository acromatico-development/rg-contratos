import { ReactNode } from "react"

export interface IColumn<T = Record<string, unknown>> {
    header: string
    accessor: keyof T
    hidden?: boolean
    searchable?: boolean
    cell?: (value: T[keyof T], row: T) => ReactNode
    linkAccessor?: boolean | ((row: T) => boolean)
}