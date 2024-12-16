import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeSelector = () => {

    const [theme, setTheme] = useState<any>("")

    const changeTheme = (param: string) => {
        switch (param) {
            case "light":
                setTheme("light")
                document.documentElement.classList.remove('dark')
                localStorage.setItem("theme", "light")
                break
            case "dark":
                setTheme("dark")
                document.documentElement.classList.add('dark')
                localStorage.setItem("theme", "dark")
                break
        }
    }

    useEffect(() => {
        if (localStorage.getItem("theme") == null) {
            setTheme("dark")
            localStorage.setItem("theme", "dark")
        } else {
            if (localStorage.getItem("theme") == "dark") {
                changeTheme("dark")
            } else if (localStorage.getItem("theme") == "light") {
                changeTheme("light")
            }
        }
    }, [])

    const handleThemeChange = () => {
        switch (theme) {
            case "dark":
                changeTheme("light")
                break
            case "light":
                changeTheme("dark")
                break
        }
    }

    return (
        <div className="fixed bottom-4 right-4">
            <div className="w-8 h-8 bg-zinc-900 dark:bg-slate-50 text-white dark:text-zinc-800 rounded-full flex justify-center items-center cursor-pointer" onClick={handleThemeChange}>
                {
                    theme === "dark" ? <FaSun /> : <FaMoon />
                }
            </div>
        </div>
    )
}

export default ThemeSelector