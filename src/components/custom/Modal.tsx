import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import useModalStore from "@/store/modalStore"


const Modal = ({ title, description, body }: { title: string, description: string, body: any }) => {

    const { status, setStatus } = useModalStore()

    return (
        <>
            {
                status &&
                <Dialog open={status} onOpenChange={setStatus}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{title}</DialogTitle>
                            <DialogDescription>{description}</DialogDescription>
                        </DialogHeader>
                        <div>
                            {(body)}
                        </div>
                    </DialogContent>
                </Dialog>
            }
        </>
    )
}

export default Modal