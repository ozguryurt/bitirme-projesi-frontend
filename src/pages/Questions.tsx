import QuestionCard from "@/components/custom/QuestionCard"
import { Button } from "@/components/ui/button"
import { FaPlus } from "react-icons/fa"
import { Link } from "react-router"

const Questions = () => {

    const questions = [
        {
            id: 1,
            title: "Lorem ipsum dolor sit amet. 1",
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab repellendus deserunt quia, magnam dolores ipsam libero tempore esse incidunt doloribus asperiores corrupti impedit at modi!",
            tags: ["csharp", "c", "python"]
        },
        {
            id: 2,
            title: "Lorem ipsum dolor sit amet. 2",
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab repellendus deserunt quia, magnam dolores ipsam libero tempore esse incidunt doloribus asperiores corrupti impedit at modi!",
            tags: ["javascript", "c", "python"]
        },
        {
            id: 3,
            title: "Lorem ipsum dolor sit amet. 3",
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab repellendus deserunt quia, magnam dolores ipsam libero tempore esse incidunt doloribus asperiores corrupti impedit at modi!",
            tags: ["javascript", "csharp", "java"]
        },
        {
            id: 4,
            title: "Lorem ipsum dolor sit amet. 4",
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab repellendus deserunt quia, magnam dolores ipsam libero tempore esse incidunt doloribus asperiores corrupti impedit at modi!",
            tags: ["javascript", "csharp", "c"]
        }
    ]

    return (
        <>
            <div className="grid grid-cols-2 px-24 py-10 gap-5">
                <div className="flex col-span-2 justify-end items-center">
                    <Button asChild>
                        <Link to={`/new-question`}><FaPlus /> Yeni soru</Link>
                    </Button>
                </div>
                {
                    questions.map((question, index) => {
                        return (
                            <QuestionCard
                                key={index}
                                id={question.id}
                                title={question.title}
                                tags={question.tags}
                            />
                        );
                    })
                }
            </div>
        </>
    )
}

export default Questions
