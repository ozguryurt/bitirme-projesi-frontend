import Modal from "@/components/custom/Modal"
import ThemeSelector from "@/components/custom/ThemeSelector"
import { Outlet } from "react-router"
import { Toaster } from "@/components/ui/toaster"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/custom/admin/AppSidebar"

const DashboardLayout = () => {


    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarTrigger />
                <Modal />
                <Toaster />
                <ThemeSelector />
                <Outlet />
            </SidebarProvider>
        </>
    )
}

export default DashboardLayout