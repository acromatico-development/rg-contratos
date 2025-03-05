import { create } from 'zustand'

interface Pagination {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

interface DataTableState {
  currentPage: number
  searchTerm: string
  loading: boolean
  pagination: Pagination
  setPagination: (pagination: Pagination) => void
  setCurrentPage: (page: number) => void
  setSearchTerm: (term: string) => void
  setLoading: (loading: boolean) => void
}

export const useDataTableStore = create<DataTableState>((set) => ({
  currentPage: 1,
  searchTerm: '',
  loading: false,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20
  },
  setPagination: (pagination) => set({ pagination }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setLoading: (loading) => set({ loading })
}))