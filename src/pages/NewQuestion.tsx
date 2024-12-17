import Divider from "@/components/custom/Divider";
import MarkdownEditor from "@/components/custom/MarkdownEditor";
import { Button } from "@/components/ui/button";
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
            <div className="w-full flex flex-col gap-3 px-24 py-10">
                <p className="font-bold text-start text-2xl">Yeni soru oluştur</p>
                <MarkdownEditor />
                <MultiSelect
                    options={frameworksList}
                    onValueChange={setSelectedFrameworks}
                    defaultValue={selectedFrameworks}
                    placeholder="Kategori seçin"
                    variant="inverted"
                    animation={2}
                    maxCount={3}
                    className="w-full"
                />
                {
                    /*
                <ul className="list-disc list-inside">
                    {selectedFrameworks.map((framework) => (
                        <li key={framework}>{framework}</li>
                    ))}
                </ul>
                    */
                }
                <Button>Oluştur</Button>
            </div>
        </>
    )
}

export default NewQuestion
