import { fetcher } from '@/lib/fetcher';
import { fetcherDelete } from '@/lib/fetcherDelete';
import QuestionType from '@/types/question/QuestionType';
import UserType from '@/types/UserType';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export const useAdmin = () => {

    const getStatistics = (): {
        statistics: any;
        statisticsIsLoading: boolean;
        statisticsIsError: any;
    } => {
        const { data, error, isLoading } = useSWR<any>(`${import.meta.env.VITE_API}/admin/get-statics`, fetcher)

        return {
            statistics: data ? data.data : null,
            statisticsIsLoading: isLoading,
            statisticsIsError: error,
        };
    };

    const getUsers = (): {
        users: UserType[] | [];
        usersIsLoading: boolean;
        usersIsError: any;
        usersMutate: () => void;
    } => {
        const { data, error, isLoading, mutate } = useSWR<any>(`${import.meta.env.VITE_API}/user`, fetcher)

        return {
            users: data ? data.data : null,
            usersIsLoading: isLoading,
            usersIsError: error,
            usersMutate: mutate
        };
    };

    const getQuestions = (): {
        questions: QuestionType[] | null;
        questionsIsLoading: boolean;
        questionsIsError: any;
        questionsMutate: () => void;
    } => {
        const { data, error, isLoading, mutate } = useSWR<{ data: QuestionType[] }>(`${import.meta.env.VITE_API}/question`, fetcher);

        return {
            questions: data ? data.data : [],
            questionsIsLoading: isLoading,
            questionsIsError: error,
            questionsMutate: mutate
        };
    };

    const {
        trigger: deleteUser,
        isMutating: deleteUserIsLoading,
        error: deleteUserIsError,
    } = useSWRMutation(
        `${import.meta.env.VITE_API}/admin`,  // url
        (url, { arg }: { arg: { user_uuid: string } }) => fetcherDelete(`${url}/${arg.user_uuid}/delete-user`, arg)
    );

    const {
        trigger: deleteQuestion,
        isMutating: deleteQuestionIsLoading,
        error: deleteQuestionIsError,
    } = useSWRMutation(
        `${import.meta.env.VITE_API}/question`,  // url
        (url, { arg }: { arg: { question_uuid: string; user_uuid: string } }) => fetcherDelete(`${url}/${arg.question_uuid}/delete`, arg)
    );

    const deleteQuestionImages = async (questionData: QuestionType) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API}/question/delete-images`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "question_uuid": questionData.uuid,
                    "image_list": questionData.image,
                    "user_uuid": questionData.User.uuid
                }),
                credentials: "include",
            })
            if (res.status === 200)
                return true
            return false
        } catch (err) {

        }
    }

    return {
        getUsers,
        getQuestions,
        getStatistics,

        deleteUser,
        deleteUserIsLoading,
        deleteUserIsError,

        deleteQuestion,
        deleteQuestionIsLoading,
        deleteQuestionIsError,
        deleteQuestionImages
    };
};