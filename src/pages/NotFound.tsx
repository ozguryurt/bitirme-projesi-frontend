import ThemeSelector from "@/components/custom/ThemeSelector"
import { Link } from "react-router"

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-3">
        <p className="font-meduim text-xl text-zinc-800 dark:text-white">Aradığınız sayfa bulunamadı.</p>
        <p className="font-medium text-sm text-zinc-800 dark:text-white">Anasayfaya dönmek için <Link to="/" className="text-blue-500">tıklayın</Link>.</p>
        <ThemeSelector />
    </div>
  )
}

export default NotFound