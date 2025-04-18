import Divider from "@/components/custom/Divider"
import { Link, useNavigate, useParams } from "react-router"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import questionReplySendSchema from "@/schemas/questionReplySendSchema"
import { Button } from "@/components/ui/button"
import CommentCard from "@/components/custom/CommentCard"
import { Loader2, SquarePen, Trash } from "lucide-react"
import useQuestion from "@/hooks/useQuestion"
import { timeAgo } from "@/lib/timeAgo"
import useModal from "@/hooks/useModal"
import { useAuth } from "@/providers/AuthProvider"
import { marked } from "marked"
import QuestionImage from "@/components/custom/QuestionImage"
import { mutate } from "swr"
import LoadingIcon from "@/components/custom/LoadingIcon"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Question = () => {

    const { userData } = useAuth()
    const { showYesNoModal } = useModal()
    const { toast } = useToast()
    let navigate = useNavigate();

    const { questionId } = useParams<string>()
    const { createComment, createCommentIsLoading, getQuestionByUUID, getQuestionCommentsByUUID, deleteQuestion, deleteQuestionIsLoading, deleteQuestionImages } = useQuestion()
    const { question, questionIsLoading, questionIsError } = getQuestionByUUID(questionId!);
    const { comments, commentsIsLoading, commentsIsError, commentsMutate } = getQuestionCommentsByUUID(questionId!);

    const form = useForm<z.infer<typeof questionReplySendSchema>>({
        resolver: zodResolver(questionReplySendSchema),
        defaultValues: {
            comment: ""
        },
    })

    const renderPreview = () => {
        return { __html: marked(question?.content || "", { breaks: true }) };
    };

    async function onSubmit(values: z.infer<typeof questionReplySendSchema>) {
        try {
            const formData_ = new FormData();
            formData_.append('comment', values.comment);
            formData_.append('user_uuid', userData?.uuid!);
            const res = await createComment({ question_uuid: questionId!, formData: formData_ });
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
        }
        finally {
            form.reset()
            commentsMutate()
        }
    }

    const handleDeleteQuestion = async () => {
        try {
            showYesNoModal("Soruyu silmek istediğinize emin misiniz?", deleteQuestionIsLoading, async () => {
                const deleteImages = await deleteQuestionImages(question!)
                if (deleteImages) {
                    const res = await deleteQuestion({ question_uuid: questionId!, user_uuid: userData?.uuid! });
                    if (res?.status === true) {
                        toast({
                            title: "Bilgi",
                            description: res.message,
                        })
                        mutate(`${import.meta.env.VITE_API}/question`, undefined, { revalidate: true });
                        setTimeout(() => {
                            navigate("/questions")
                        }, 1 * 1000);
                    }
                } else {
                    toast({
                        title: "Bilgi",
                        description: "Bir hata meydana geldi, daha sonra tekrar deneyin.",
                    })
                }
            })
        } catch (error) {
            toast({
                title: "Bilgi",
                description: "Bir hata meydana geldi, daha sonra tekrar deneyin.",
            })
        }
    }

    return (
        <>
            {
                questionIsError ? <>Bir hata meydana geldi.</> :
                    questionIsLoading ? <LoadingIcon /> : question ?
                        <div className="w-full flex flex-col gap-3 px-5 lg:px-24 py-5">
                            <div className="w-full flex justify-start items-center gap-3">
                                <p className="w-full font-extrabold text-3xl truncate">
                                    {question?.header}
                                </p>
                                {
                                    userData?.uuid === question.User.uuid &&
                                    <Link to={`/question/${question?.uuid}/edit-question`}>
                                        <Button variant="secondary">
                                            <SquarePen />
                                        </Button>
                                    </Link>
                                }
                                {
                                    userData?.uuid === question.User.uuid &&
                                    <Button variant="destructive" onClick={handleDeleteQuestion}>
                                        <Trash />
                                    </Button>
                                }
                            </div>
                            <p className="w-full font-medium text-xs truncate">
                                #{question?.uuid}
                            </p>
                            <Link to={`/profile/${question.User.uuid}`} className="flex justify-start items-center gap-2">
                                <Avatar className="w-14 h-14 rounded-full">
                                    <AvatarImage src={`${import.meta.env.VITE_IMAGE_BASEPATH}/${question.User.avatar}`} />
                                    <AvatarFallback>{question.User.nickname}</AvatarFallback>
                                </Avatar>
                                <div className="w-full flex flex-col justify-center items-start">
                                    <p className="w-full truncate font-medium">
                                        {question?.User?.nickname}
                                    </p>
                                    <p className="w-full truncate text-xs font-medium text-start">
                                        {timeAgo(question?.CreatedAt!)}
                                    </p>
                                </div>
                            </Link>
                            <div
                                className="w-full min-h-[200px] overflow-x-clip break-words"
                                dangerouslySetInnerHTML={renderPreview()}
                            />
                            <div className="w-full flex flex-wrap gap-3">
                                {
                                    question?.Tags?.map((tag, index) => <Link to={`/questions?tags=${tag.uuid}`} key={index} className="font-medium text-blue-500 text-xs">#{tag.name}</Link>)
                                }
                            </div>
                            {
                                question.image !== null &&
                                <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
                                    {
                                        question.image.map((img: string, index: number) => {
                                            return (
                                                <QuestionImage key={index} path={img} />
                                            )
                                        })
                                    }
                                </div>
                            }
                            <Divider />
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="comment"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    <p className="w-full font-bold text-2xl">
                                                        Yorum yaz
                                                    </p>
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Cevabınız..."
                                                        className="resize-none"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" disabled={createCommentIsLoading}>
                                        {
                                            createCommentIsLoading ? (
                                                <>
                                                    <Loader2 className="animate-spin" />
                                                    Lütfen bekleyin
                                                </>
                                            ) : "Gönder"
                                        }
                                    </Button>
                                </form>
                            </Form>
                            <Divider />
                            <p className="w-full font-bold text-2xl">
                                Cevaplar ({comments !== null ? comments?.length : '0'})
                            </p>
                            <div className="w-full flex flex-col justify-start items-center gap-3">
                                {
                                    commentsIsError ? <>Bir hata meydana geldi.</> :
                                        commentsIsLoading ? <LoadingIcon /> : comments ? comments.map((comment, index) => {
                                            return (
                                                <CommentCard key={index} data={comment} commentsMutateFn={commentsMutate} />
                                            )
                                        }) : <p className="text-center">Henüz bir yorum yapılmamış.</p>
                                }
                            </div>
                        </div>
                        :
                        <p className="text-center">Soru bulunamadı.</p>
            }
        </>
    )
}

export default Question