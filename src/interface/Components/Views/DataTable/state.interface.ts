export interface ITableState<T> {
    data: T[]
    currentPage: number
    searchTerm: string
    loading: boolean
    pagination: {
        currentPage: number
        totalPages: number
        totalItems: number
        itemsPerPage: number
    }
    setData: (data: T[]) => void
    setPagination: (pagination: ITableState<T>['pagination']) => void
    setCurrentPage: (page: number) => void
    setSearchTerm: (term: string) => void
    setLoading: (loading: boolean) => void
    reset: () => void
}