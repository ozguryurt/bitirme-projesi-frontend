import { Link, useNavigate } from "react-router"
import Divider from "./Divider";
import QuestionType from "@/types/question/QuestionType";
import { timeAgo } from "@/lib/timeAgo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const QuestionCard = ({ data }: { data: QuestionType }) => {

    let navigate = useNavigate()

    return (
        <Link to={`/question/${data.uuid}`} className="cursor-pointer">
            <div className="flex flex-col justify-center items-start border rounded-md p-2 gap-3 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-all">
                <div className="w-full grid grid-cols-2">
                    {/* <Link to={`/profile/${data.User?.uuid}`} className="w-full flex justify-start items-center gap-2"> */}
                    <p className="w-full flex justify-start items-center gap-2">
                        <Avatar className="w-14 h-14 rounded-full">
                            <AvatarImage src={`${import.meta.env.VITE_IMAGE_BASEPATH}/${data.User?.avatar}`} />
                            <AvatarFallback>{data.User.nickname}</AvatarFallback>
                        </Avatar>
                        <span className="w-full truncate font-medium">
                            {data.User?.nickname}
                        </span>
                    </p>
                    <div className="flex justify-end items-center">
                        <p className="w-full truncate text-sm font-medium text-end">
                            {timeAgo(data.CreatedAt)}
                        </p>
                    </div>
                </div>
                <div className="w-full truncate">
                    <p className="font-bold text-xl">{data.header}</p>
                </div>
                <Divider />
                <div className="w-full flex flex-wrap gap-3">
                    {
                        data.Tags?.slice(0, 3).map((tag, index) => <p onClick={() => navigate(`/questions?tags=${tag.name}`)} key={index} className="font-medium text-blue-500 text-xs">#{tag.name}</p>)
                    }
                </div>
            </div>
        </Link>
    )
}

export default QuestionCard