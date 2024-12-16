import QuestionCard from "@/components/custom/QuestionCard"

const Questions = () => {

    const questions = [
        {
            title: "Lorem ipsum dolor sit amet. 1",
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab repellendus deserunt quia, magnam dolores ipsam libero tempore esse incidunt doloribus asperiores corrupti impedit at modi!",
            tags: ["csharp", "c", "python"]
        },
        {
            title: "Lorem ipsum dolor sit amet. 2",
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab repellendus deserunt quia, magnam dolores ipsam libero tempore esse incidunt doloribus asperiores corrupti impedit at modi!",
            tags: ["javascript", "c", "python"]
        },
        {
            title: "Lorem ipsum dolor sit amet. 3",
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab repellendus deserunt quia, magnam dolores ipsam libero tempore esse incidunt doloribus asperiores corrupti impedit at modi!",
            tags: ["javascript", "csharp", "java"]
        },
        {
            title: "Lorem ipsum dolor sit amet. 4",
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab repellendus deserunt quia, magnam dolores ipsam libero tempore esse incidunt doloribus asperiores corrupti impedit at modi!",
            tags: ["javascript", "csharp", "c"]
        }
    ]

    return (
        <>
            <div className="grid grid-cols-2 px-24 py-10 gap-5">
                {
                    questions.map((question, index) => {
                        return (
                            <QuestionCard
                                key={index}
                                title={question.title}
                                description={question.description}
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