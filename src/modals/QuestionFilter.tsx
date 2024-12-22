import useFilterStore from '@/store/filterStore'
import { Checkbox } from "@/components/ui/checkbox"
import { useLocation, useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import useModal from '@/hooks/useModal';
import { useEffect } from 'react';

const QuestionFilter = () => {

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

    const categories = ["javascript", "python", "java", "csharp"]

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
        <div className="w-full flex flex-col gap-2">
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
    )
}

export default QuestionFilter