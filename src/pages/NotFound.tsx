import ThemeSelector from "@/components/custom/ThemeSelector"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-3">
      <img src="/notfound.png" alt="Not found image" />
      <p className="font-meduim text-xl text-zinc-800 dark:text-white">Hay aksi, görünüşe göre yanlış gidiyorsun.</p>
      <Button asChild className="rounded-full">
        <Link to="/">Ana Sayfaya Dön</Link>
      </Button>
      <ThemeSelector />
    </div>
  )
}

export default NotFound