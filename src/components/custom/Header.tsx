import {
    ChevronsLeft,
    CircleHelp,
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

const Header = () => {

    const [tab, setTab] = useState<number>(0)
    const [open, setOpen] = useState<boolean>(false)

    return (
        <>
            <NavigationMenu>
                <NavigationMenuList className="w-full flex-wrap lg:flex justify-between items-center px-24 py-5 shadow gap-5">
                    <div className="flex justify-start items-center gap-5">
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
                    <div className="flex justify-end items-center gap-5">
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to="/register" className={navigationMenuTriggerStyle()}>
                                    Kayıt ol
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to="/login" className={navigationMenuTriggerStyle()}>
                                    Giriş yap
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <DropdownMenu open={open} onOpenChange={setOpen}>
                                <DropdownMenuTrigger asChild>
                                    <img src="https://www.gravatar.com/avatar/0dde57a178da66520b18e3a737b6d6ed?s=80&d=mp&r=g" alt="User profile picture" className="w-12 h-12 rounded-full cursor-pointer" />
                                </DropdownMenuTrigger>
                                {
                                    tab === 0 &&
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                <User />
                                                <Link to="/profil" onClick={() => setOpen(false)}>
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
                                            <DropdownMenuItem className="cursor-pointer" onClick={(event) => {
                                                event.preventDefault();
                                                setTab(1);
                                            }}>
                                                <Megaphone />
                                                <span>Bildirimler</span>
                                                <Badge variant="outline">1</Badge>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <LogOut />
                                            <span>Çıkış yap</span>
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
                                                Geri | Bildirimler
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
                    </div>
                </NavigationMenuList>
            </NavigationMenu>
        </>
    )
}

export default Header