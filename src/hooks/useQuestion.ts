import { fetcher } from '@/lib/fetcher';
import CommentType from '@/types/question/CommentType';
import CreateCommentType from '@/types/question/CreateCommentType';
import CreateQuestionType from '@/types/question/CreateQuestionType';
import QuestionTagType from '@/types/question/QuestionTagType';
import QuestionType from '@/types/question/QuestionType';
import useSWR from 'swr';

const useQuestion = () => {

    // Tagları çek
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
        const { data, error, isLoading } = useSWR<{ data: QuestionType[] }>(`${import.meta.env.VITE_API}/question`, fetcher);

        return {
            questions: data ? data.data : [],
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
    } => {
        const { data, error, isLoading } = useSWR<{ data: CommentType[] }>(
            `${import.meta.env.VITE_API}/comment/${uuid}/comments`,
            fetcher
        );

        return {
            comments: data ? data.data : null,
            commentsIsLoading: isLoading,
            commentsIsError: error,
        };
    };

    const createQuestion = async (questionData: CreateQuestionType) => {
        try {
            const formData = new FormData();
            formData.append('header', questionData.header ?? '');
            formData.append('content', questionData.content ?? '');
            formData.append('user_uuid', questionData.user_uuid ?? '');

            const images = Object.values(questionData.form);

            images.forEach((img: any) => {
                formData.append("form", img);
            });

            if (questionData.tags && Array.isArray(questionData.tags)) {
                const tagsString = questionData.tags.join(',');
                formData.append('tags', tagsString);
            }

            const response = await fetch(`${import.meta.env.VITE_API}/question/create`, {
                method: 'POST',
                credentials: "include",
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to create question.');
            }

            const newQuestion = await response.json();
            return newQuestion;
        } catch (error) {
            throw error;
        }
    };


    const createComment = async (commentData: CreateCommentType) => {
        try {
            const formData = new FormData();
            formData.append('comment', commentData.comment ?? '');
            formData.append('user_uuid', commentData.user_uuid ?? '');

            const response = await fetch(`${import.meta.env.VITE_API}/comment/${commentData.question_uuid}/add-comment`, {
                method: 'POST',
                credentials: "include",
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to create question.');
            }

            const newQuestion = await response.json();
            return newQuestion;
        } catch (error) {
            throw error;
        }
    };

    return {
        getTags,
        getQuestions,
        createQuestion,
        getQuestionByUUID,
        getQuestionCommentsByUUID,
        createComment
    };
};

export default useQuestion;
