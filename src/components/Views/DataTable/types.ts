export interface Column {
  header: string
  accessor: string
  searchable?: boolean
}

export interface ViewProps<T> {
  title: string
  createButton: {
    label: string
    onClick: () => void
  }
  columns: Column[]
  data: T[]
  fetchData: (page: number, search?: string) => Promise<void>
  formatTableData: (data: T[]) => ITableRow[]
}

export interface ITableRow {
  identifier: {
    text: {
      value: string
      bold: boolean
    }
    subText?: string
    link?: string
  }
  rows: Array<{
    type: 'single' | 'double'
    data: {
      text: {
        value: string
        bold: boolean
      }
      subText?: string
    }
  }>
}