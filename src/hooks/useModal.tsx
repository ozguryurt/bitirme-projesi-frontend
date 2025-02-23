import useModalStore from "@/stores/modalStore"
import { ReactNode } from "react"

type ModalType = {
    showModal: (title: string, description: string, body: ReactNode) => void
    closeModal: () => void
}

const useModal = (): ModalType => {
    const { setStatus, setModalTitle, setModalDescription, setModalBody } = useModalStore()

    const showModal = (title: string, description: string, body: ReactNode) => {
        setStatus(true)
        setModalTitle(title)
        setModalDescription(description)
        setModalBody(body)
    }

    const closeModal = () => {
        setStatus(false)
        setModalTitle("")
        setModalDescription("")
        setModalBody(<></>)
    }

    return { showModal, closeModal }
}

export default useModal