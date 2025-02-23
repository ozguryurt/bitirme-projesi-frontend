import Modal from "@/components/custom/Modal"
import ThemeSelector from "@/components/custom/ThemeSelector"
import { Outlet } from "react-router"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/custom/Header"

const MainLayout = () => {


    return (
        <>
            <Modal />
            <Toaster />
            <ThemeSelector />
            <Header />
            <Outlet />
        </>
    )
}

export default MainLayout