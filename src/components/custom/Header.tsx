import {
    CircleHelp,
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    Megaphone,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Link } from "react-router"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

const Header = () => {
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
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <img src="https://www.gravatar.com/avatar/0dde57a178da66520b18e3a737b6d6ed?s=80&d=mp&r=g" alt="User profile picture" className="w-12 h-12 rounded-full cursor-pointer" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <User />
                                            <span>Profil</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Settings />
                                            <span>Ayarlar</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <CircleHelp />
                                            <span>Sorularım</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Megaphone />
                                            <span>Bildirimler</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <LogOut />
                                        <span>Çıkış yap</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </NavigationMenuItem>
                    </div>
                </NavigationMenuList>
            </NavigationMenu>
        </>
    )
}

export default Header