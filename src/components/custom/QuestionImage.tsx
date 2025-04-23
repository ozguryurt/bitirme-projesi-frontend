import useModal from "@/hooks/useModal"
import { Trash } from "lucide-react"

const QuestionImage = ({ path, onClickFn }: { path: string, onClickFn?: () => void }) => {

    const { showModal } = useModal()

    const newPath = path.includes("http") ? path : `${import.meta.env.VITE_IMAGE_BASEPATH}/${path}`

    const handleClick = () => {
        showModal({
            title: "Resim",
            description: "",
            body: <img onClick={handleClick} src={newPath} alt="" className={`rounded-md w-full h-auto`} />
        })
    }

    return (
        <div className="w-full h-40 relative overflow-hidden rounded-md">
            {
                onClickFn &&
                <div className="absolute right-1 top-1 bg-red-500 p-1 rounded-md z-[10] cursor-pointer" onClick={onClickFn}>
                    <Trash size={15} />
                </div>
            }
            <img onClick={handleClick} src={newPath} alt="Question Image" className={`min-w-full min-h-full rounded-md cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`} />
        </div>
    )
}

export default QuestionImage