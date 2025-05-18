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
import { useNavigate, useParams } from "react-router";
import LoadingIcon from "@/components/custom/LoadingIcon";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { useToast } from "@/hooks/use-toast";

const EditQuestion = () => {
    const { questionId } = useParams<string>()

    const { userData } = useAuth()
    const { toast } = useToast()
    let navigate = useNavigate()

    const { getQuestionByUUID } = useQuestion()
    const { question, questionIsLoading, questionIsError } = getQuestionByUUID(questionId!);

    const { getTags, editQuestion, editQuestionIsLoading } = useQuestion()
    const { tags, isLoading } = getTags();
    const frameworksList = tags?.map(tag => ({ value: tag.uuid, label: tag.name }));

    const newQuestionForm = useForm<z.infer<typeof newQuestionFormSchema>>({
        resolver: zodResolver(newQuestionFormSchema),
        defaultValues: {
            header: question?.header,
            content: question?.content,
            tags: question?.Tags.map(tag => tag.uuid),
        },
    });

    const onSubmit = async (values: z.infer<typeof newQuestionFormSchema>) => {
        try {
            /*if (values.tags && Array.isArray(values.tags)) {
                const tagsString = values.tags.join(',');
                formData_.append('tags', tagsString);
            }*/
            console.log(questionId, values.header, values.content, userData?.uuid!)
            const res = await editQuestion({
                question_uuid: questionId!,
                Header: values.header,
                Content: values.content,
                user_uuid: userData?.uuid!
            });

            if (res?.status === true) {
                toast({
                    title: "Bilgi",
                    description: res.message,
                })
                navigate(`/question/${question?.uuid}`)
            }
            else {
                toast({
                    title: "Bilgi",
                    description: res.message,
                })
            }
        } catch (error) {
            toast({
                title: "Bilgi",
                description: "Bir hata meydana geldi, daha sonra tekrar deneyin.",
            })
        } finally {
            newQuestionForm.reset();
        }
    };

    return (
        <>
            {
                questionIsError ? <>Bir hata meydana geldi.</> :
                    questionIsLoading ? <LoadingIcon /> : question ?
                        <div className="w-full flex flex-col gap-3 px-5 lg:px-24 py-5">
                            <p className="font-bold text-start text-2xl">Soruyu düzenle</p>
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

                                    <Button type="submit" disabled={editQuestionIsLoading}>
                                        {
                                            editQuestionIsLoading ? (
                                                <>
                                                    <Loader2 className="animate-spin" />
                                                    Lütfen bekleyin
                                                </>
                                            ) : "Düzenle"
                                        }
                                    </Button>
                                </form>
                            </Form>
                        </div>
                        :
                        <>Veri bulunamadı.</>
            }
        </>
    );
};

export default EditQuestion;