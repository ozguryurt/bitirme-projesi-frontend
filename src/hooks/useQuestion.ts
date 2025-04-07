import { fetcher } from '@/lib/fetcher';
import { fetcherDelete } from '@/lib/fetcherDelete';
import { fetcherPutBody } from '@/lib/fetcherPutBody';
import { fetcherWithFormData } from '@/lib/fetcherWithFormData';
import CommentType from '@/types/question/CommentType';
import QuestionTagType from '@/types/question/QuestionTagType';
import QuestionType from '@/types/question/QuestionType';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

const useQuestion = () => {

    const getTags = (): {
        tags: QuestionTagType[] | [];
        isLoading: boolean;
        isError: any;
    } => {
        const { data, error, isLoading } = useSWR<any>(`${import.meta.env.VITE_API}/tags`, fetcher)

        return {
            tags: data ? data.data : null,
            isLoading,
            isError: error,
        };
    };

    const getQuestions = (): {
        questions: QuestionType[] | null;
        isLoading: boolean;
        isError: any;
    } => {
        const { data, error, isLoading } = useSWR(`${import.meta.env.VITE_API}/question`, fetcher);

        return {
            questions: data?.data !== undefined ? data.data : null,
            isLoading,
            isError: error,
        };
    };

    const getQuestionByUUID = (uuid: string): {
        question: QuestionType | null;
        questionIsLoading: boolean;
        questionIsError: any;
    } => {
        const { data, error, isLoading } = useSWR<{ data: QuestionType }>(
            `${import.meta.env.VITE_API}/question/${uuid}`,
            fetcher
        );

        return {
            question: data ? data.data : null,
            questionIsLoading: isLoading,
            questionIsError: error,
        };
    };

    const getQuestionCommentsByUUID = (uuid: string): {
        comments: CommentType[] | null;
        commentsIsLoading: boolean;
        commentsIsError: any;
        commentsMutate: () => void;
    } => {
        const { data, error, isLoading, mutate } = useSWR(
            `${import.meta.env.VITE_API}/comment/${uuid}/comments`,
            fetcher
        );

        return {
            comments: data?.data !== undefined ? data.data : null,
            commentsIsLoading: isLoading,
            commentsIsError: error,
            commentsMutate: mutate
        };
    };

    const {
        trigger: createQuestion,
        isMutating: createQuestionIsLoading,
        error: createQuestionIsError
    } = useSWRMutation(
        `${import.meta.env.VITE_API}/question/create`,
        (url, { arg }: { arg: { formData: FormData } }) => fetcherWithFormData(`${url}`, arg.formData)
    );

    const {
        trigger: editQuestion,
        isMutating: editQuestionIsLoading,
        error: editQuestionIsError
    } = useSWRMutation(
        `${import.meta.env.VITE_API}/question`,
        (url, { arg }: { arg: { question_uuid: string; Question: { Header: string; Content: string }; user_uuid: string } }) =>
            fetcherPutBody(`${url}/${arg.question_uuid}/update`, arg)
    );

    const {
        trigger: deleteQuestion,
        isMutating: deleteQuestionIsLoading,
        error: deleteQuestionIsError,
    } = useSWRMutation(
        `${import.meta.env.VITE_API}/question`,  // url
        (url, { arg }: { arg: { question_uuid: string; user_uuid: string } }) => fetcherDelete(`${url}/${arg.question_uuid}/delete`, arg)
    );

    const {
        trigger: createComment,
        isMutating: createCommentIsLoading,
        error: createCommentIsError
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
    );

    return {
        getTags,
        getQuestions,

        createQuestion,
        createQuestionIsLoading,
        createQuestionIsError,

        editQuestion,
        editQuestionIsLoading,
        editQuestionIsError,

        deleteQuestion,
        deleteQuestionIsLoading,
        deleteQuestionIsError,

        getQuestionByUUID,
        getQuestionCommentsByUUID,

        createComment,
        createCommentIsLoading,
        createCommentIsError,

        deleteComment,
        deleteCommentIsLoading,
        deleteCommentIsError
    };
};

export default useQuestion;
