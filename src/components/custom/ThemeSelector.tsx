import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

const ThemeSelector = () => {
    const [theme, setTheme] = useState<"light" | "dark">("dark")

    const changeTheme = (param: "light" | "dark") => {
        setTheme(param)
        document.documentElement.classList.toggle("dark", param === "dark")
        localStorage.setItem("theme", param)
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme")

        if (savedTheme === "light" || savedTheme === "dark") {
            changeTheme(savedTheme)
        } else {
            // Cihazın temasını kontrol et
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
            changeTheme(prefersDark ? "dark" : "light")
        }
    }, [])

    const handleThemeChange = () => {
        changeTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <div className="fixed bottom-4 right-4">
            <div
                className="w-8 h-8 bg-zinc-900 dark:bg-slate-50 text-white dark:text-zinc-800 rounded-full flex justify-center items-center cursor-pointer"
                onClick={handleThemeChange}
            >
                {theme === "dark" ? <Sun /> : <Moon />}
            </div>
        </div>
    )
}

export default ThemeSelector