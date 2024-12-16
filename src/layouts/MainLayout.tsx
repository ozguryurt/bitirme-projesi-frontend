import Modal from "@/components/custom/Modal"
import ThemeSelector from "@/components/custom/ThemeSelector"
import useModalStore from "@/store/modalStore"
import { Outlet } from "react-router"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/custom/Header"

const MainLayout = () => {

    const { modalTitle, modalDescription, modalBody } = useModalStore()

    return (
        <>
            <Modal title={modalTitle} description={modalDescription} body={modalBody} />
            <Toaster />
            <ThemeSelector />
            <Header />
            <Outlet />
        </>
    )
}

export default MainLayout