import { fetcher } from '@/lib/fetcher';
import useSWR from 'swr';

const useComment = () => {

    const getCommentReactions = (comment_uuid: string): {
        reactions: { dislike_count: number, like_count: number } | null;
        reactionsIsLoading: boolean;
        reactionsIsError: any;
        reactionsMutate: () => void;
    } => {
        const { data, error, isLoading, mutate } = useSWR(
            `${import.meta.env.VITE_API}/comment/${comment_uuid}/reaction-count`,
            fetcher
        );

        return {
            reactions: data?.data !== undefined ? data.data : null,
            reactionsIsLoading: isLoading,
            reactionsIsError: error,
            reactionsMutate: mutate
        };
    };

    /*const {
        trigger: likeComment,
        isMutating: likeCommentIsLoading,
        error: likeCommentIsError
    } = useSWRMutation(
        `${import.meta.env.VITE_API}/comment`,  // URL
        (url, { arg }: { arg: { question_uuid: string; formData: FormData } }) => fetcherWithFormData(`${url}/${arg.question_uuid}/add-comment`, arg.formData)
    );

    const {
        trigger: deleteComment,
        isMutating: deleteCommentIsLoading,
        error: deleteCommentIsError
    } = useSWRMutation(
        `${import.meta.env.VITE_API}/comment`,  // URL
        (url, { arg }: { arg: { comment_uuid: string; user_uuid: string } }) => fetcherDelete(`${url}/${arg.comment_uuid}/delete-comment`, { user_uuid: arg.user_uuid })
    );*/

    return {
        getCommentReactions
    };
};

export default useComment;