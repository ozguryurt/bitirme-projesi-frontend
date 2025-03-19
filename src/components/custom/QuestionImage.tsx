import useModal from "@/hooks/useModal"

const QuestionImage = ({ path, customClassName }: { path: string, customClassName: string }) => {

    const { showModal } = useModal()

    const newPath = path.includes("http") ? path : `${import.meta.env.VITE_IMAGE_BASEPATH}/${path}`

    const handleClick = () => {
        showModal("Resim", "", <>
            <img onClick={handleClick} src={newPath} alt="" className={`rounded-md w-full h-auto`} />
        </>)
    }

    return (
        <img onClick={handleClick} src={newPath} alt="" className={`rounded-md cursor-pointer ${customClassName}`} />
    )
}

export default QuestionImage