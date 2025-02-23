import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import useModalStore from "@/stores/modalStore"


const Modal: React.FC = () => {

    const { modalTitle, modalDescription, modalBody, status, setStatus } = useModalStore()

    return (
        <>
            {
                status &&
                <Dialog open={status} onOpenChange={setStatus}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{modalTitle}</DialogTitle>
                            <DialogDescription>{modalDescription}</DialogDescription>
                        </DialogHeader>
                        <div>
                            {(modalBody)}
                        </div>
                    </DialogContent>
                </Dialog>
            }
        </>
    )
}

export default Modal