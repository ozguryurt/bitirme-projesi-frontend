import { Button } from "@/components/ui/button"
import useModalStore from "@/stores/modalStore"
import { Loader2 } from "lucide-react"
import { ReactNode } from "react"

type ModalType = {
    showModal: ({ title, description, body }: { title: string, description: string, body: ReactNode }) => void
    closeModal: () => void
    showYesNoModal: ({ text, disabledStatus, yesBtnFn }: { text: string, disabledStatus: boolean, yesBtnFn: () => Promise<void> }) => void
}

const useModal = (): ModalType => {
    const { setStatus, setModalTitle, setModalDescription, setModalBody } = useModalStore()

    const showModal = ({ title, description, body }: { title: string, description: string, body: ReactNode }) => {
        setStatus(true)
        setModalTitle(title)
        setModalDescription(description)
        setModalBody(body)
    }

    const showYesNoModal = ({ text, disabledStatus, yesBtnFn }: { text: string, disabledStatus: boolean, yesBtnFn: () => Promise<void> }) => {
        setStatus(true);
        setModalTitle("Bilgi");
        setModalDescription("");

        const handleYesClick = async () => {
            setModalBody(
                <div className="flex flex-col justify-center items-start gap-4">
                    <p className="text-sm">{text}</p>
                    <div className="w-full flex justify-end items-center gap-2">
                        <Button className="text-xs" variant="secondary" onClick={() => closeModal()}>
                            İptal
                        </Button>
                        <Button className="text-xs" disabled>
                            <Loader2 className="animate-spin" />
                            Lütfen bekleyin
                        </Button>
                    </div>
                </div>
            );

            await yesBtnFn()
            closeModal()
        };

        setModalBody(
            <div className="flex flex-col justify-center items-start gap-4">
                <p className="text-sm">{text}</p>
                <div className="w-full flex justify-end items-center gap-2">
                    <Button className="text-xs" variant="secondary" onClick={() => closeModal()}>
                        İptal
                    </Button>
                    <Button className="text-xs" onClick={handleYesClick} disabled={disabledStatus}>
                        {disabledStatus ? (
                            <>
                                <Loader2 className="animate-spin" />
                                Lütfen bekleyin
                            </>
                        ) : (
                            "Onayla"
                        )}
                    </Button>
                </div>
            </div>
        );
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