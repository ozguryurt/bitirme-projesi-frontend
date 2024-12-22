import { create } from 'zustand'

type Store = {
    filters: string[],
    sortOrder: string,
    setFilters: (newFilters: string[]) => void,
    setSortOrder: (newSortOrder: string) => void,
}

const useFilterStore = create<Store>()((set) => ({
    filters: [],
    sortOrder: "",
    setFilters: (newFilters: string[]) => set(() => ({ filters: newFilters })),
    setSortOrder: (newSortOrder: string) => set(() => ({ sortOrder: newSortOrder })),
}))

export default useFilterStore