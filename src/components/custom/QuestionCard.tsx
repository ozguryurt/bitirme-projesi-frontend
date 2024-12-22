import { Link } from "react-router"
import Divider from "./Divider";

interface QuestionCardProps {
    id: number,
    title: string;
    tags: string[];
}

const QuestionCard = ({ id, title, tags }: QuestionCardProps) => {
    return (
        <>
            <div className="w-full flex flex-col justify-center items-start border rounded-md p-2 gap-3 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-all">
                <div className="w-full grid grid-cols-2">
                    <Link to={`/profil/10`} className="w-full flex justify-start items-center gap-2">
                        <img src="https://www.gravatar.com/avatar/0dde57a178da66520b18e3a737b6d6ed?s=80&d=mp&r=g" alt="User profile picture" className="w-8 h-8 rounded-full" />
                        <p className="w-full truncate font-medium">
                            username
                        </p>
                    </Link>
                    <div className="flex justify-end items-center">
                        <p className="w-full truncate text-sm font-medium text-end">
                            1 saat önce
                        </p>
                    </div>
                </div>
                <Link to={`/question/${id}`} className="font-bold text-xl">{title}</Link>
                <Divider />
                <div className="w-full flex flex-wrap gap-3">
                    {
                        tags.map((tag, index) => <Link to={`/questions?tags=${tag}`} key={index} className="font-medium text-blue-500 text-xs">#{tag}</Link>)
                    }
                </div>
            </div>
        </>
    )
}

export default QuestionCard