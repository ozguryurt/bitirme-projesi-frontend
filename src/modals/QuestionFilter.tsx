import useFilterStore from '@/stores/filterStore'
import { Checkbox } from "@/components/ui/checkbox"
import { useLocation, useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import useModal from '@/hooks/useModal';
import { useEffect } from 'react';
import useQuestion from '@/hooks/useQuestion';

const QuestionFilter = () => {

    const { getTags } = useQuestion()
    const { tags, isLoading } = getTags();
    const categories = tags?.map(tag => (tag.name));

    const { filters, setFilters, sortOrder } = useFilterStore()
    const { closeModal } = useModal()

    const { search } = useLocation()
    let navigate = useNavigate()

    useEffect(() => {
        const urlParams = new URLSearchParams(search)
        const tagsParam = urlParams.get('tags')
        if (tagsParam)
            setFilters(tagsParam.split(','))
        else
            setFilters([])
    }, [search])

    const handleCheckedChange = async (checked: any, category: string) => {
        checked ? setFilters([...filters, category]) : setFilters(filters.filter((filter) => filter !== category))
    }

    const applyFilterButton = async () => {
        let url = '/questions'
        if (filters.length > 0) url += `?tags=${filters.join(',')}`
        if (sortOrder) url += filters.length > 0 ? `&sort=${sortOrder}` : `?sort=${sortOrder}`
        navigate(url)
        closeModal()
    }

    return (
        <>
            {
                isLoading === true ?
                    <>Yükleniyor...</>
                    :
                    <div className="w-full flex flex-col gap-2 overflow-y-scroll">
                        {categories.map((category, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <Checkbox
                                    id={category}
                                    checked={filters.includes(category)}
                                    onCheckedChange={(value) => {
                                        handleCheckedChange(value, category)
                                    }}
                                />
                                <label
                                    htmlFor={category}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {category}
                                </label>
                            </div>
                        ))}
                        <Button onClick={applyFilterButton}>Uygula</Button>
                    </div>
            }
        </>
    )
}

export default QuestionFilter