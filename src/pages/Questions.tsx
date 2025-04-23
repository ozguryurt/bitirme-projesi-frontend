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
import { Plus, StarsIcon } from "lucide-react"
import QuestionFilter from "@/modals/QuestionFilter"
import useFilterStore from "@/stores/filterStore"
import { useEffect, useState } from "react"
import useQuestion from "@/hooks/useQuestion"
import LoadingIcon from "@/components/custom/LoadingIcon"
import { useAuth } from "@/providers/AuthProvider"

const Questions = () => {

    const { search } = useLocation()
    let navigate = useNavigate()
    const { showModal } = useModal()
    const { userData } = useAuth()

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
        showModal({
            title: "Kategoriye göre filtrele",
            description: "",
            body: <QuestionFilter />
        })
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
            <div className="flex flex-col px-5 lg:px-24 py-5 gap-5">
                <div className="flex lg:justify-end justify-center items-center gap-3">
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
                    {
                        userData &&
                        <>
                            <Button asChild>
                                <Link to={`/new-question`}><Plus /> Yeni soru</Link>
                            </Button>
                            <div className="relative inline-block group">
                                <StarsIcon className="absolute -top-4 -right-4 w-5 h-5 text-yellow-400 
                                    drop-shadow-[0_0_8px_rgba(255,235,59,0.7)] 
                                    animate-[pulse_2s_infinite]" />

                                <Button asChild className="relative overflow-hidden">
                                    <Link to={`/ask-ai`} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                                        <StarsIcon className="w-5 h-5 text-purple-300 
                                            drop-shadow-[0_0_6px_rgba(253,224,71,0.8)]
                                            animate-[ping_1.5s_infinite]" />
                                        <span className="font-medium text-white">StackAI</span>
                                        <StarsIcon className="w-5 h-5 text-cyan-300 
                                            drop-shadow-[0_0_6px_rgba(103,232,249,0.8)]
                                            animate-[ping_1.5s_infinite_0.5s]" />
                                    </Link>
                                </Button>

                                <StarsIcon className="absolute -bottom-4 -left-4 w-5 h-5 text-pink-400 
                                    drop-shadow-[0_0_10px_rgba(236,72,153,0.6)]
                                    animate-[pulse_3s_infinite_1s]" />
                            </div>
                        </>
                    }
                </div>
                <div className="flex justify-center items-center gap-2">
                    {
                        isError ? <>Bir hata meydana geldi.</> :
                            isLoading ? <LoadingIcon /> : questions ?
                                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
                                    {
                                        questions.map((question, index) => {
                                            return (
                                                <QuestionCard
                                                    key={index}
                                                    data={question}
                                                />
                                            );
                                        })
                                    }
                                </div>
                                :
                                <p className="text-center">Soru bulunamadı.</p>
                    }
                </div>
            </div>
        </>
    )
}

export default Questions
