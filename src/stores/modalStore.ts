import { create } from 'zustand'

type Store = {
    status: boolean
    modalTitle: string,
    modalDescription: string,
    modalBody: any,
    setStatus: (newState: boolean) => void,
    setModalTitle: (newState: string) => void,
    setModalDescription: (newState: string) => void,
    setModalBody: (newState: any) => void,
}

const useModalStore = create<Store>()((set) => ({
    status: false,
    modalTitle: "",
    modalDescription: "",
    modalBody: "",
    setStatus: (newState: boolean) => set(() => ({ status: newState })),
    setModalTitle: (newState: string) => set(() => ({ modalTitle: newState })),
    setModalDescription: (newState: string) => set(() => ({ modalDescription: newState })),
    setModalBody: (newState: any) => set(() => ({ modalBody: newState }))
}))

export default useModalStore