import Divider from "@/components/custom/Divider"
import { Link, useParams } from "react-router"
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
import { SquarePen } from "lucide-react"
import useQuestion from "@/hooks/useQuestion"
import { timeAgo } from "@/lib/timeAgo"
import useModal from "@/hooks/useModal"
import { useAuth } from "@/providers/AuthProvider"
import { marked } from "marked"
import QuestionImage from "@/components/custom/QuestionImage"

const Question = () => {

    const { userData } = useAuth()
    const { showModal } = useModal()

    const { questionId } = useParams<string>()
    const { createComment, getQuestionByUUID, getQuestionCommentsByUUID } = useQuestion()
    const { question, questionIsLoading, questionIsError } = getQuestionByUUID(questionId!);
    const { comments, commentsIsLoading, commentsIsError } = getQuestionCommentsByUUID(questionId!);

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
            const res = await createComment({ ...values, question_uuid: questionId!, user_uuid: userData?.uuid! })
            if (res?.status === true)
                showModal("Başarılı", "Başarıyla yorum gönderdiniz.", <></>)
            else
                showModal("Başarısız", "Bir hata meydana geldi, daha sonra tekrar deneyin.", <></>)
        } catch (error) {
            showModal("Başarısız", "Bir hata meydana geldi, daha sonra tekrar deneyin.", <></>)
        }
    }

    return (
        <>
            {
                questionIsLoading === true ?
                    <>Yükleniyor...</>
                    :
                    question !== null ?
                        <div className="w-full flex flex-col gap-3 px-5 lg:px-24 py-5">
                            <div className="w-full flex justify-start items-center gap-3">
                                <p className="w-full font-extrabold text-3xl truncate">
                                    {question?.header}
                                </p>
                                <Link to={`/edit-question`}>
                                    <SquarePen />
                                </Link>
                            </div>
                            <p className="w-full font-medium text-xs truncate">
                                #{question?.uuid}
                            </p>
                            <Link to={`/profile/${question.User.uuid}`} className="flex justify-start items-center gap-2">
                                <img src={`${import.meta.env.VITE_IMAGE_BASEPATH}/${question.User.avatar}`} alt="User profile picture" className="w-14 h-14 rounded-full" />
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
                                <div className="grid grid-cols-6 gap-3">
                                    {
                                        question.image.map((img: string, index: number) => {
                                            return (
                                                <QuestionImage key={index} path={img} customClassName="w-full h-32" />
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
                                                        Cevap yaz
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
                                    <Button type="submit">Gönder</Button>
                                </form>
                            </Form>
                            <Divider />
                            <p className="w-full font-bold text-2xl">
                                Cevaplar ({comments !== null ? comments?.length : '0'})
                            </p>
                            <div className="w-full flex flex-col justify-start items-center gap-3">
                                {
                                    commentsIsLoading === true ?
                                        <>Yükleniyor...</>
                                        :
                                        comments !== null ?
                                            <>
                                                {
                                                    comments?.map((comment, index) => {
                                                        return (
                                                            <CommentCard key={index} data={comment} />
                                                        )
                                                    })
                                                }
                                            </>
                                            :
                                            <>Henüz bir yorum yapılmamış.</>
                                }
                            </div>
                        </div>
                        :
                        <>Veri bulunamadı.</>
            }
        </>
    )
}

export default Question