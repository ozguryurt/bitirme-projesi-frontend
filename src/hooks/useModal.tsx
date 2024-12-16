import useModalStore from "@/store/modalStore"
import { ReactNode } from "react"

type ModalType = {
    showModal: (title: string, description: string, body: ReactNode) => void
}

const useModal = (): ModalType => {
    const { setStatus, setModalTitle, setModalDescription, setModalBody } = useModalStore()

    const showModal = (title: string, description: string, body: ReactNode) => {
        setStatus(true)
        setModalTitle(title)
        setModalDescription(description)
        setModalBody(body)
    }

    return { showModal }
}

export default useModal