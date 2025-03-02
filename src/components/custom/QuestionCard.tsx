import { Link } from "react-router"
import Divider from "./Divider";
import QuestionType from "@/types/question/QuestionType";
import { timeAgo } from "@/lib/timeAgo";

const QuestionCard = ({ data }: { data: QuestionType }) => {
    return (
        <>
            <div className="w-full flex flex-col justify-center items-start border rounded-md p-2 gap-3 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-all">
                <div className="w-full grid grid-cols-2">
                    <Link to={`/profile/${data.User?.uuid}`} className="w-full flex justify-start items-center gap-2">
                        <img src={`${import.meta.env.VITE_IMAGE_BASEPATH}/${data.User?.avatar}`} alt="User profile picture" className="w-8 h-8 rounded-full" />
                        <p className="w-full truncate font-medium">
                            {data.User?.nickname}
                        </p>
                    </Link>
                    <div className="flex justify-end items-center">
                        <p className="w-full truncate text-sm font-medium text-end">
                            {timeAgo(data.CreatedAt)}
                        </p>
                    </div>
                </div>
                <div className="w-full truncate">
                    <Link to={`/question/${data.uuid}`} className="font-bold text-xl">{data.header}</Link>
                </div>
                <Divider />
                <div className="w-full flex flex-wrap gap-3">
                    {
                        data.Tags?.slice(0, 3).map((tag, index) => <Link to={`/questions?tags=${tag.uuid}`} key={index} className="font-medium text-blue-500 text-xs">#{tag.name}</Link>)
                    }
                </div>
            </div>
        </>
    )
}

export default QuestionCard