import { fetcher } from '@/lib/fetcher';
import CommentType from '@/types/question/CommentType';
import CreateCommentType from '@/types/question/CreateCommentType';
import CreateQuestionType from '@/types/question/CreateQuestionType';
import DeleteQuestionType from '@/types/question/DeleteQuestionType';
import QuestionTagType from '@/types/question/QuestionTagType';
import QuestionType from '@/types/question/QuestionType';
import useSWR, { useSWRConfig } from 'swr';

const useQuestion = () => {

    const { mutate } = useSWRConfig();

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
        commentsMutate: () => void;
    } => {
        const { data, error, isLoading, mutate } = useSWR<{ data: CommentType[] }>(
            `${import.meta.env.VITE_API}/comment/${uuid}/comments`,
            fetcher
        );

        return {
            comments: data ? data.data : null,
            commentsIsLoading: isLoading,
            commentsIsError: error,
            commentsMutate: mutate
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

    const deleteQuestion = async (questionData: DeleteQuestionType) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API}/question/${questionData.question_uuid}/delete`, {
                method: 'DELETE',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_uuid: questionData.user_uuid
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create question.');
            }

            const newQuestion = await response.json();
            mutate(`${import.meta.env.VITE_API}/question`, undefined, { revalidate: true }); // Soru silindiğinde yeni verileri çeksin
            return newQuestion;
        } catch (error) {
            throw error;
        }
    }


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
        createComment,
        deleteQuestion
    };
};

export default useQuestion;
