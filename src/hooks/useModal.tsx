import { Button } from "@/components/ui/button"
import useModalStore from "@/stores/modalStore"
import { ReactNode } from "react"

type ModalType = {
    showModal: (title: string, description: string, body: ReactNode) => void
    closeModal: () => void
    showYesNoModal: (text: string, yesBtnFn: () => void) => void
}

const useModal = (): ModalType => {
    const { setStatus, setModalTitle, setModalDescription, setModalBody } = useModalStore()

    const showModal = (title: string, description: string, body: ReactNode) => {
        setStatus(true)
        setModalTitle(title)
        setModalDescription(description)
        setModalBody(body)
    }

    const showYesNoModal = (text: string, yesBtnFn: () => void) => {
        setStatus(true)
        setModalTitle("Bilgi")
        setModalDescription("")
        setModalBody(<>
            <div className="flex flex-col justify-center items-start gap-3">
                <p className="text-sm">{text}</p>
                <Button className="text-xs p-1" onClick={yesBtnFn}>Onayla</Button>
            </div>
        </>)
    }

    const closeModal = () => {
        setStatus(false)
        setModalTitle("")
        setModalDescription("")
        setModalBody(<></>)
    }

    return { showModal, closeModal, showYesNoModal }
}

export default useModal