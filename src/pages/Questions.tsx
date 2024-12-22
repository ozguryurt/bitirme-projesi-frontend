import QuestionCard from "@/components/custom/QuestionCard"
import { Button } from "@/components/ui/button"
import { Link, useLocation, useNavigate } from "react-router"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import useModal from "@/hooks/useModal"
import { Plus } from "lucide-react"
import QuestionFilter from "@/modals/QuestionFilter"
import useFilterStore from "@/store/filterStore"
import { useEffect, useState } from "react"

const Questions = () => {

    const { search } = useLocation()
    let navigate = useNavigate()
    const { showModal } = useModal()

    const [selectedSort, setSelectedSort] = useState<string | null>(null)

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

    const { filters, setSortOrder } = useFilterStore()

    useEffect(() => {
        const urlParams = new URLSearchParams(search)
        const sortParam = urlParams.get('sort')
        if (sortParam === 'asc' || sortParam === 'desc')
            setSelectedSort(sortParam)
        else
            setSelectedSort(null)
    }, [search])

    const handleFilterButton = async () => {
        showModal("Kategoriye göre filtrele", "", <QuestionFilter />)
    }

    const handleSortButton = (e: string) => {
        setSortOrder(e)
        let url = '/questions'
        if (filters.length > 0) url += `?tags=${filters.join(',')}`
        if (e) url += filters.length > 0 ? `&sort=${e}` : `?sort=${e}`
        navigate(url)
    }


    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 px-5 lg:px-24 py-5 gap-5">
                <div className="flex col-span-1 lg:col-span-2 justify-end items-center gap-2">
                    <Select value={selectedSort ? selectedSort : undefined} onValueChange={handleSortButton}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Sırala" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="asc">Tarih: En yeni</SelectItem>
                                <SelectItem value="desc">Tarih: En eski</SelectItem>
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
