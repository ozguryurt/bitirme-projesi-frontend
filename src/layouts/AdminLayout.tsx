import Modal from "@/components/custom/Modal"
import ThemeSelector from "@/components/custom/ThemeSelector"
import { Outlet } from "react-router"
import { Toaster } from "@/components/ui/toaster"

const AdminLayout = () => {

    return (
        <>
            <Modal />
            <Toaster />
            <ThemeSelector />
            <Outlet />
        </>
    )
}

export default AdminLayout