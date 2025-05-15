import { fetcher } from '@/lib/fetcher';
import { fetcherWithBody } from '@/lib/fetcherWithBody';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

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

    const {
        trigger: likeComment,
        isMutating: likeCommentIsLoading,
        error: likeCommentIsError
    } = useSWRMutation(
        `${import.meta.env.VITE_API}/comment`,  // URL
        (url, { arg }: { arg: { comment_uuid: string } }) => fetcherWithBody(`${url}/${arg.comment_uuid}/like`, { arg })
    );

    const {
        trigger: dislikeComment,
        isMutating: dislikeCommentIsLoading,
        error: dislikeCommentIsError
    } = useSWRMutation(
        `${import.meta.env.VITE_API}/comment`,  // URL
        (url, { arg }: { arg: { comment_uuid: string } }) => fetcherWithBody(`${url}/${arg.comment_uuid}/dislike`, { arg })
    );

    return {
        getCommentReactions,

        likeComment,
        likeCommentIsLoading,
        likeCommentIsError,

        dislikeComment,
        dislikeCommentIsLoading,
        dislikeCommentIsError
    };
};

export default useComment;