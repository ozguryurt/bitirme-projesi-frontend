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
import { useRef, useState } from "react";
import QuestionImage from "@/components/custom/QuestionImage";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NewQuestion = () => {

    const { userData } = useAuth()
    const { toast } = useToast()

    const { getTags, createQuestion, createQuestionIsLoading } = useQuestion()
    const { tags, isLoading } = getTags();
    const frameworksList = tags?.map(tag => ({ value: tag.uuid, label: tag.name }));

    const fileInputRef = useRef<HTMLInputElement>(null);

    const newQuestionForm = useForm<z.infer<typeof newQuestionFormSchema>>({
        resolver: zodResolver(newQuestionFormSchema),
        defaultValues: {
            header: "",
            content: "",
            tags: [],
        },
    });

    const [images, setImages] = useState<File[]>([]);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files); // Dosyaları diziye çevir
            setImages((prevImages) => [...prevImages, ...files]); // State'i güncelle
            if (fileInputRef.current)
                fileInputRef.current.value = "";
        }
    };
    const handleRemoveImage = (index: number) => setImages((prev) => prev.filter((_, i) => i !== index));

    const onSubmit = async (values: z.infer<typeof newQuestionFormSchema>) => {
        try {
            const formData_ = new FormData();
            formData_.append('header', values.header);
            formData_.append('content', values.content);
            formData_.append('user_uuid', userData?.uuid!);
            const images_ = Object.values(images);
            images_.forEach((img: any) => {
                formData_.append("form", img);
            });
            if (values.tags && Array.isArray(values.tags)) {
                const tagsString = values.tags.join(',');
                formData_.append('tags', tagsString);
            }
            const res = await createQuestion({ formData: formData_ });
            if (res?.status === true)
                toast({
                    title: "Bilgi",
                    description: res.message,
                })
            else
                toast({
                    title: "Bilgi",
                    description: res.message,
                })
        } catch (error) {
            toast({
                title: "Bilgi",
                description: "Bir hata meydana geldi, daha sonra tekrar deneyin.",
            })
        } finally {
            newQuestionForm.reset();
            setImages([])
        }
    };


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
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                placeholder="shadcn"
                                multiple
                                onChange={handleFileChange}
                            />
                        </FormControl>
                        <FormMessage className="font-medium text-xs" />
                    </FormItem>
                    <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
                        {images.map((image, index) => (
                            <QuestionImage key={index} path={URL.createObjectURL(image)} onClickFn={() => handleRemoveImage(index)} />
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

                    <Button type="submit" disabled={createQuestionIsLoading}>
                        {
                            createQuestionIsLoading ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    Lütfen bekleyin
                                </>
                            ) : "Oluştur"
                        }
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default NewQuestion;