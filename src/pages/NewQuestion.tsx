import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import newQuestionFormSchema from "@/schemas/newQuestionFormSchema";
import MarkdownEditor from "@/components/custom/MarkdownEditor";

const NewQuestion = () => {
    const frameworksList = [
        { value: "react", label: "React" },
        { value: "angular", label: "Angular" },
        { value: "vue", label: "Vue" },
        { value: "svelte", label: "Svelte" },
        { value: "ember", label: "Ember" },
    ];

    const newQuestionForm = useForm<z.infer<typeof newQuestionFormSchema>>({
        resolver: zodResolver(newQuestionFormSchema),
        defaultValues: {
            title: "",
            body: "",
            frameworks: [],
        },
    });

    const onSubmit = (values: z.infer<typeof newQuestionFormSchema>) => {
        console.log(values);
    };

    return (
        <div className="w-full flex flex-col gap-3 px-5 lg:px-24 py-5">
            <p className="font-bold text-start text-2xl">Yeni soru oluştur</p>
            <Form {...newQuestionForm}>
                <form onSubmit={newQuestionForm.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    {/* Başlık */}
                    <FormField
                        control={newQuestionForm.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Başlık</FormLabel>
                                <FormControl>
                                    <Input placeholder="Başlık" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* İçerik */}
                    <FormField
                        control={newQuestionForm.control}
                        name="body"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-medium text-base text-zinc-800 dark:text-white">İçerik</FormLabel>
                                <FormControl>
                                    <MarkdownEditor
                                        placeholder="Soru içeriği..."
                                        onValueChange={(value) => field.onChange(value)}
                                        defaultValue={field.value}
                                    />
                                </FormControl>
                                <FormMessage className="font-medium text-xs" />
                            </FormItem>
                        )}
                    />

                    {/* MultiSelect */}
                    <FormField
                        control={newQuestionForm.control}
                        name="frameworks"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kategori</FormLabel>
                                <FormControl>
                                    <MultiSelect
                                        options={frameworksList}
                                        onValueChange={(value) => field.onChange(value)}
                                        defaultValue={field.value}
                                        placeholder="Kategori seçin"
                                        maxCount={3}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Oluştur</Button>
                </form>
            </Form>
        </div>
    );
};

export default NewQuestion;