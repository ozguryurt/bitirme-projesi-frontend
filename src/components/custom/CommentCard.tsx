import { Link } from "react-router"
import Divider from "./Divider"
import { ChevronsDown, ChevronsUp } from "lucide-react"
import CommentType from "@/types/question/CommentType"
import { timeAgo } from "@/lib/timeAgo"

const CommentCard = ({ data }: { data: CommentType }) => {
    return (
        <>
            <div className="w-full flex flex-col gap-3 rounded-md border p-5">
                <Link to={`/profile/${data.user.uuid}`} className="flex justify-start items-center gap-2">
                    <img src={`${import.meta.env.VITE_IMAGE_BASEPATH}/${data.user.avatar}`} alt="User profile picture" className="w-14 h-14 rounded-full" />
                    <div className="w-full flex flex-col justify-center items-start">
                        <p className="w-full truncate font-medium">
                            {data.user.nickname}
                        </p>
                        <p className="w-full truncate text-xs font-medium text-start">
                            {timeAgo(data.CreatedAt)}
                        </p>
                    </div>
                </Link>
                <div className="reply-content">
                    {data.comment}
                </div>
                <Divider />
                <div className="w-full flex justify-start items-center gap-3">
                    <div className="flex justify-center items-center gap-1 cursor-pointer">
                        <ChevronsUp className="text-green-500" />
                        <span className="text-xs font-medium">7</span>
                    </div>
                    <div className="flex justify-center items-center gap-1 cursor-pointer">
                        <ChevronsDown className="text-red-500" />
                        <span className="text-xs font-medium">4</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CommentCard