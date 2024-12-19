import QuestionCard from "@/components/custom/QuestionCard"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

import useModal from "@/hooks/useModal"
import { Plus } from "lucide-react"

const Questions = () => {

    const { showModal } = useModal()

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

    const handleFilterButton = (): void => {
        showModal("Kategoriye göre filtrele", "", <>
            <div className="w-full flex flex-col gap-2">
                <div className="flex items-center space-x-2">
                    <Checkbox id="javascript" />
                    <label htmlFor="javascript" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Javascript</label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="python" />
                    <label htmlFor="python" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Python</label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="csharp" />
                    <label htmlFor="csharp" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">C#</label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="java" />
                    <label htmlFor="java" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Java</label>
                </div>
                <Button>Uygula</Button>
            </div>
        </>)
    }

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 px-5 lg:px-24 py-5 gap-5">
                <div className="flex col-span-1 lg:col-span-2 justify-end items-center gap-2">
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sırala" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="1">Tarih: En yeni</SelectItem>
                                <SelectItem value="2">Tarih: En eski</SelectItem>
                                <SelectItem value="3">Yorum: En fazla</SelectItem>
                                <SelectItem value="3">Yorum: En az</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button onClick={handleFilterButton}>Filtrele</Button>
                    <Button asChild>
                        <Link to={`/new-question`}><Plus /> Yeni soru</Link>
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
