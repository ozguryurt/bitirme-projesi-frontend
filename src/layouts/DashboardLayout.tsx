import Modal from "@/components/custom/Modal"
import ThemeSelector from "@/components/custom/ThemeSelector"
import useModalStore from "@/store/modalStore"
import { Outlet } from "react-router"
import { Toaster } from "@/components/ui/toaster"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/custom/admin/AppSidebar"

const DashboardLayout = () => {

    const { modalTitle, modalDescription, modalBody } = useModalStore()

    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarTrigger />
                <Modal title={modalTitle} description={modalDescription} body={modalBody} />
                <Toaster />
                <ThemeSelector />
                <Outlet />
            </SidebarProvider>
        </>
    )
}

export default DashboardLayout