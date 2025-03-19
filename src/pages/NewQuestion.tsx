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
import useQuestion from "@/hooks/useQuestion";
import { useAuth } from "@/providers/AuthProvider";
import useModal from "@/hooks/useModal";
import { useState } from "react";
import QuestionImage from "@/components/custom/QuestionImage";

const NewQuestion = () => {

    const { userData } = useAuth()
    const { showModal } = useModal()

    const { getTags, createQuestion } = useQuestion()
    const { tags, isLoading } = getTags();
    const frameworksList = tags?.map(tag => ({ value: tag.uuid, label: tag.name }));

    const newQuestionForm = useForm<z.infer<typeof newQuestionFormSchema>>({
        resolver: zodResolver(newQuestionFormSchema),
        defaultValues: {
            header: "",
            content: "",
            tags: [],
        },
    });

    const pictureRef = newQuestionForm.register("form");

    const [images, setImages] = useState<File[]>([]);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files); // Dosyaları diziye çevir
            setImages((prevImages) => [...prevImages, ...files]); // State'i güncelle
        }
    };

    const onSubmit = async (values: z.infer<typeof newQuestionFormSchema>) => {
        try {
            console.log({ ...values, user_uuid: userData?.uuid! })
            const res = await createQuestion({ ...values, user_uuid: userData?.uuid! })
            if (res?.status === true)
                showModal("Başarılı", "Başarıyla soru oluşturdunuz.", <></>)
            else
                showModal("Başarısız", "Bir hata meydana geldi, daha sonra tekrar deneyin.", <></>)
        } catch (error) {
            showModal("Başarısız", "Bir hata meydana geldi, daha sonra tekrar deneyin." + error, <></>)
        }
    }

    return (
        <div className="w-full flex flex-col gap-3 px-5 lg:px-24 py-5">
            <p className="font-bold text-start text-2xl">Yeni soru oluştur</p>
            <Form {...newQuestionForm}>
                <form onSubmit={newQuestionForm.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    {/* Başlık */}
                    <FormField
                        control={newQuestionForm.control}
                        name="header"
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
                        name="content"
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

                    {/* Resim */}
                    <FormItem className="w-full">
                        <div className="flex justify-start items-center gap-3">
                            <FormLabel className="font-medium text-base text-zinc-800 dark:text-white">Resim ekle</FormLabel>
                        </div>
                        <FormControl>
                            <Input
                                type="file"
                                accept="image/*"
                                placeholder="shadcn"
                                {...pictureRef}
                                multiple
                                onChange={handleFileChange}
                            />
                        </FormControl>
                        <FormMessage className="font-medium text-xs" />
                    </FormItem>
                    <div className="grid grid-cols-8 gap-4">
                        {images.map((image, index) => (
                            <QuestionImage key={index} path={URL.createObjectURL(image)} customClassName="w-full h-full rounded-lg" />
                        ))}
                    </div>

                    {/* MultiSelect */}
                    {
                        isLoading === true ?
                            <>Yükleniyor...</>
                            :
                            <FormField
                                control={newQuestionForm.control}
                                name="tags"
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
                    }

                    <Button type="submit">Oluştur</Button>
                </form>
            </Form>
        </div>
    );
};

export default NewQuestion;