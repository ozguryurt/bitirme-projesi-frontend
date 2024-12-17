import { MultiSelect } from "@/components/ui/multi-select"
import { useState } from "react";

const NewQuestion = () => {

    const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(["react", "angular"]);

    const frameworksList = [
        { value: "react", label: "React" },
        { value: "angular", label: "Angular" },
        { value: "vue", label: "Vue" },
        { value: "svelte", label: "Svelte" },
        { value: "ember", label: "Ember" },
    ];

    return (
        <>
            <div className="w-full flex flex-col px-24 py-10">
                <MultiSelect
                    options={frameworksList}
                    onValueChange={setSelectedFrameworks}
                    defaultValue={selectedFrameworks}
                    placeholder="Kategori seçin"
                    variant="inverted"
                    animation={2}
                    maxCount={3}
                />
                <ul className="list-disc list-inside">
                    {selectedFrameworks.map((framework) => (
                        <li key={framework}>{framework}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default NewQuestion
