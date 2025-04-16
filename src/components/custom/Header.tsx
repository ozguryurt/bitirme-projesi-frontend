import {
    AlignJustify,
    ChevronsLeft,
    CircleHelp,
    Loader2,
    LogOut,
    Megaphone,
    Settings,
    User,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Link } from "react-router"
import { Badge } from "@/components/ui/badge"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { useState } from "react"
import NotificationCard from "./NotificationCard"
import { useAuth } from "@/providers/AuthProvider"
import { useToast } from "@/hooks/use-toast"
import useAuthStore from "@/stores/authStore"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet"

const Header = () => {

    const { userData, logout, logoutIsLoading } = useAuth()
    const { setUser } = useAuthStore();
    const { toast } = useToast()
    const [tab, setTab] = useState<number>(0)
    const [open, setOpen] = useState<boolean>(false)

    const handleLogout = async () => {
        try {
            const res = await logout()
            if (res.status === true) {
                toast({
                    title: "Bilgi",
                    description: res.message,
                })
                setUser(null)
            }
            else {
                toast({
                    title: "Bilgi",
                    description: res.message,
                })
            }
        } catch (error) {
            toast({
                title: "Bilgi",
                description: `Bir hata meydana geldi, daha sonra tekrar deneyin.`,
            })
        }
    }

    return (
        <>
            <NavigationMenu>
                <NavigationMenuList className="w-full lg:flex justify-between items-center lg:px-24 px-5 py-5">
                    <div className="flex justify-start items-center gap-3">
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to="/" className={navigationMenuTriggerStyle()}>
                                    Ana sayfa
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to="/questions" className={navigationMenuTriggerStyle()}>
                                    Sorular
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </div>
                    <div className="flex justify-end items-center gap-3">
                        {
                            !userData &&
                            <>
                                <Sheet>
                                    <SheetTrigger className="lg:hidden block" asChild>
                                        <AlignJustify />
                                    </SheetTrigger>
                                    <SheetContent>
                                        <div className="grid gap-2 py-4">
                                            <SheetClose asChild>
                                                <Link to="/register" className={navigationMenuTriggerStyle()}>
                                                    Kayıt ol
                                                </Link>
                                            </SheetClose>
                                            <SheetClose asChild>
                                                <Link to="/login" className={navigationMenuTriggerStyle()}>
                                                    Giriş yap
                                                </Link>
                                            </SheetClose>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                                <NavigationMenuItem className="lg:block hidden">
                                    <NavigationMenuLink asChild>
                                        <Link to="/register" className={navigationMenuTriggerStyle()}>
                                            Kayıt ol
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem className="lg:block hidden">
                                    <NavigationMenuLink asChild>
                                        <Link to="/login" className={navigationMenuTriggerStyle()}>
                                            Giriş yap
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </>
                        }
                        {
                            userData &&
                            <NavigationMenuItem>
                                <DropdownMenu open={open} onOpenChange={setOpen}>
                                    <DropdownMenuTrigger asChild>
                                        <Avatar className="w-12 h-12 rounded-full cursor-pointer">
                                            <AvatarImage src={`${import.meta.env.VITE_IMAGE_BASEPATH}/${userData.avatar}`} />
                                            <AvatarFallback>{userData?.nickname}</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    {
                                        tab === 0 &&
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <User />
                                                    <Link to={`/profile/${userData.uuid}`} onClick={() => setOpen(false)}>
                                                        Profil
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Settings />
                                                    <Link to="/settings" onClick={() => setOpen(false)}>
                                                        Ayarlar
                                                    </Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <CircleHelp />
                                                    <Link to="/myquestions" onClick={() => setOpen(false)}>
                                                        Sorularım
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Megaphone />
                                                    <span className="cursor-pointer" onClick={(event) => {
                                                        event.preventDefault();
                                                        setTab(1);
                                                    }}>Bildirimler</span>
                                                    <Badge variant="outline">1</Badge>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={handleLogout}>
                                                <LogOut />
                                                <span>
                                                    {
                                                        logoutIsLoading ? (
                                                            <div className="flex gap-2">
                                                                <Loader2 className="animate-spin" />
                                                                <span>Lütfen bekleyin</span>
                                                            </div>
                                                        ) : "Çıkış yap"
                                                    }
                                                </span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    }
                                    {
                                        tab === 1 &&
                                        <DropdownMenuContent className="w-96">
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem className="cursor-pointer" onClick={(event) => {
                                                    setTab(0)
                                                    event.preventDefault()
                                                }}>
                                                    <ChevronsLeft size={15} />
                                                    Geri - Bildirimler
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <NotificationCard title="Özel mesaj" description="Yöneticiden özel bir mesaj aldınız." />
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <NotificationCard title="Yeni cevap" description="'Javascript sorunlarım' başlıklı sorunuza yeni yanıt gönderildi." to="/admin/dashboard" />
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    }
                                </DropdownMenu>
                            </NavigationMenuItem>
                        }
                    </div>
                </NavigationMenuList>
            </NavigationMenu>
        </>
    )
}

export default Header