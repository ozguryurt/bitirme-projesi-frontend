import { Link } from "react-router"

interface QuestionCardProps {
    title: string;
    description: string;
    tags: string[];
}

const QuestionCard = ({ title, description, tags }: QuestionCardProps) => {
    return (
        <>
            <div className="w-full flex flex-col justify-center items-start border rounded-md p-2 gap-3 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-all">
                <Link to={'/question/123'} className="font-bold text-xl">{title}</Link>
                <p className="w-full truncate font-normal">
                    {description}
                </p>
                <div className="w-full flex flex-wrap gap-3">
                    {
                        tags.map((tag, index) => <Link to={`/questions/tag/${tag}`} key={index} className="font-medium text-blue-500 text-xs">#{tag}</Link>)
                    }
                </div>
            </div>
        </>
    )
}

export default QuestionCard