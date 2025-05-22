import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import questionReplySendSchema from "@/schemas/questionReplySendSchema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import useQuestion from "@/hooks/useQuestion"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import UserType from "@/types/UserType"
import { useToast } from "@/hooks/use-toast"
import Divider from "./Divider"

const QuestionReply = ({ userData, questionId }: { userData: UserType, questionId: string }) => {

    const { createComment, createCommentIsLoading, getQuestionCommentsByUUID } = useQuestion()
    const { commentsMutate } = getQuestionCommentsByUUID(questionId!);
    const { toast } = useToast()

    const form = useForm<z.infer<typeof questionReplySendSchema>>({
        resolver: zodResolver(questionReplySendSchema),
        defaultValues: {
            comment: ""
        },
    })

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
            form.reset()
        } catch (error) {
            toast({
                title: "Bilgi",
                description: "Bir hata meydana geldi, daha sonra tekrar deneyin.",
            })
        } finally {
            commentsMutate()
        }
    }

    return (
        <>
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
        </>
    )
}

export default QuestionReply