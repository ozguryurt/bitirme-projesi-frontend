import useFilterStore from '@/stores/filterStore'
import { Checkbox } from "@/components/ui/checkbox"
import { useLocation, useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from "@/components/ui/input"
import useModal from '@/hooks/useModal';
import { useEffect, useState } from 'react';
import useQuestion from '@/hooks/useQuestion';
import LoadingIcon from '@/components/custom/LoadingIcon';

const QuestionFilter = () => {

    const [categorySearch, setCategorySearch] = useState<string>("")
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
                    <LoadingIcon />
                    :
                    <div className="flex flex-col gap-3">
                        <Input placeholder="Kategori arayın..." className="font-medium text-base text-zinc-800 dark:text-white" value={categorySearch} onChange={(e) => setCategorySearch(e.currentTarget.value)} />
                        <div className="w-full h-72 flex flex-col gap-2 overflow-y-scroll">
                            {
                                categories
                                    .filter((category) =>
                                        categorySearch
                                            ? category.toLowerCase().includes(categorySearch.toLowerCase())
                                            : true
                                    )
                                    .map((category, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={category}
                                                checked={filters.includes(category)}
                                                onCheckedChange={(value) => {
                                                    handleCheckedChange(value, category);
                                                }}
                                            />
                                            <label
                                                htmlFor={category}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {category}
                                            </label>
                                        </div>
                                    ))
                            }
                        </div>
                        <Button onClick={applyFilterButton}>Uygula</Button>
                    </div>
            }
        </>
    )
}

export default QuestionFilter