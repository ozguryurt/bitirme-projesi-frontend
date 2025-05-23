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
import { Filter, Plus } from "lucide-react"
import QuestionFilter from "@/modals/QuestionFilter"
import useFilterStore from "@/stores/filterStore"
import useQuestion from "@/hooks/useQuestion"
import LoadingIcon from "@/components/custom/LoadingIcon"
import { useAuth } from "@/providers/AuthProvider"
import AskAIButton from "@/components/custom/AskAIButton"
import { useEffect } from "react"

const Questions = () => {

    let navigate = useNavigate()
    const { showModal } = useModal()
    const { userData } = useAuth()

    const { getQuestions } = useQuestion()
    const { questions, isLoading, isError } = getQuestions();

    const { filters, sortOrder, setFilters, setSortOrder } = useFilterStore()

    const { search } = useLocation()

    useEffect(() => {
        const urlParams = new URLSearchParams(search);

        const tagsParam = urlParams.get('tags');
        const sortParam = urlParams.get('sort');

        if (tagsParam) {
            setFilters(tagsParam.split(','));
        } else {
            setFilters([]);
        }

        if (sortParam === 'asc' || sortParam === 'desc') {
            setSortOrder(sortParam);
        } else {
            setSortOrder('');
        }
    }, [search]);

    const handleRemoveFilters = () => {
        setFilters([])
        setSortOrder("")
        navigate("/questions")
    }

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
                    <Select value={sortOrder ? sortOrder : undefined} onValueChange={handleSortButton}>
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
                    <Button onClick={handleFilterButton}><Filter /> <span className="lg:block hidden">Filtrele</span></Button>
                    {
                        (filters.length > 0 || sortOrder !== "") &&
                        <>
                            <Button variant="destructive" onClick={handleRemoveFilters}>Filtreleri temizle</Button>
                        </>
                    }
                    {
                        userData &&
                        <>
                            <Button asChild>
                                <Link to={`/new-question`}><Plus /> <span className="lg:block hidden">Yeni soru</span></Link>
                            </Button>
                            <AskAIButton mouseEffect={true} />
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
