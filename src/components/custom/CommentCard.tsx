import { Link } from "react-router"
import Divider from "./Divider"
import { ChevronsDown, ChevronsUp, Loader2, Trash } from "lucide-react"
import CommentType from "@/types/question/CommentType"
import { timeAgo } from "@/lib/timeAgo"
import { useAuth } from "@/providers/AuthProvider"
import { Button } from "../ui/button"
import useModal from "@/hooks/useModal"
import useQuestion from "@/hooks/useQuestion"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useComment from "@/hooks/useComment"

const CommentCard = ({ data, commentsMutateFn }: { data: CommentType, commentsMutateFn?: () => void; }) => {

    const { userData } = useAuth()
    const { showYesNoModal } = useModal()
    const { toast } = useToast()
    const { deleteComment, deleteCommentIsLoading } = useQuestion()
    const { getCommentReactions, likeComment, likeCommentIsLoading, dislikeComment, dislikeCommentIsLoading } = useComment()
    const {
        reactions,
        //reactionsIsLoading,
        //reactionsIsError,
        //reactionsMutate
    } = getCommentReactions(data?.uuid!)

    const handleReaction = async (reaction_type: string) => {
        if (reaction_type === "like") {
            const res = await likeComment({ comment_uuid: data.uuid! });
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
        } else {
            const res = await dislikeComment({ comment_uuid: data.uuid! });
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
        }
    }

    const handleDeleteComment = async () => {
        try {
            showYesNoModal({
                text: "Yorumu silmek istediğinize emin misiniz?",
                disabledStatus: deleteCommentIsLoading,
                yesBtnFn: async () => {
                    const res = await deleteComment({ comment_uuid: data.uuid!, user_uuid: userData?.uuid! });
                    if (res?.status === true) {
                        toast({
                            title: "Bilgi",
                            description: res.message,
                        })
                        if (commentsMutateFn) commentsMutateFn()
                    }
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
            <div className="w-full flex flex-col gap-3 rounded-md border p-5">
                <Link to={`/profile/${data.user.uuid}`} className="flex justify-start items-center gap-2">
                    <Avatar className="w-14 h-14 rounded-full cursor-pointer">
                        <AvatarImage src={`${import.meta.env.VITE_IMAGE_BASEPATH}/${data.user.avatar}`} />
                        <AvatarFallback>{data.user.nickname}</AvatarFallback>
                    </Avatar>
                    <div className="w-full flex flex-col justify-center items-start">
                        <p className="w-full truncate font-medium">
                            {data.user.nickname}
                        </p>
                        <p className="w-full truncate text-xs font-medium text-start">
                            {timeAgo(data.CreatedAt)}
                        </p>
                    </div>
                </Link>
                <div className="reply-content break-words whitespace-pre-wrap">
                    <span>{data.comment}</span>
                </div>
                <Divider />
                <div className="w-full flex justify-start items-center gap-3">
                    <div className="flex justify-center items-center gap-1 cursor-pointer" onClick={() => handleReaction("like")}>
                        <ChevronsUp className="text-green-500" />
                        <span className="text-xs font-medium">{reactions?.like_count}</span>
                        {
                            likeCommentIsLoading ?
                                <Loader2 className="animate-spin" />
                                :
                                <>
                                    <ChevronsUp className="text-green-500" />
                                    <span className="text-xs font-medium">{reactions?.like_count}</span>
                                </>
                        }
                    </div>
                    <div className="flex justify-center items-center gap-1 cursor-pointer" onClick={() => handleReaction("dislike")}>
                        {
                            dislikeCommentIsLoading ?
                                <Loader2 className="animate-spin" />
                                :
                                <>
                                    <ChevronsDown className="text-red-500" />
                                    <span className="text-xs font-medium">{reactions?.dislike_count}</span>
                                </>
                        }
                    </div>
                    {
                        userData?.uuid === data.user_uuid && (
                            <Button variant="destructive" onClick={handleDeleteComment}>
                                <Trash />
                            </Button>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default CommentCard