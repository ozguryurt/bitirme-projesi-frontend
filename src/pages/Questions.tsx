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
import useFilterStore from "@/stores/filterStore"
import { useEffect, useState } from "react"
import useQuestion from "@/hooks/useQuestion"

const Questions = () => {

    const { search } = useLocation()
    let navigate = useNavigate()
    const { showModal } = useModal()

    const { getQuestions } = useQuestion()
    const { questions, isLoading, isError } = getQuestions();

    const [selectedSort, setSelectedSort] = useState<string | null>(null)

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
                    isLoading === true ?
                        <>Yükleniyor...</>
                        :
                        isError !== true ?
                            questions?.map((question, index) => {
                                return (
                                    <QuestionCard
                                        key={index}
                                        data={question}
                                    />
                                );
                            })
                            :
                            <>Bir hata meydana geldi, daha sonra tekrara deneyin.</>
                }
            </div>
        </>
    )
}

export default Questions
