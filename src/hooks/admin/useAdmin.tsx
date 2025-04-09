import { fetcher } from '@/lib/fetcher';
import QuestionType from '@/types/question/QuestionType';
import UserType from '@/types/UserType';
import useSWR from 'swr';

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
    } => {
        const { data, error, isLoading } = useSWR<any>(`${import.meta.env.VITE_API}/user`, fetcher)

        return {
            users: data ? data.data : null,
            usersIsLoading: isLoading,
            usersIsError: error,
        };
    };

    const getQuestions = (): {
        questions: QuestionType[] | null;
        questionsIsLoading: boolean;
        questionsIsError: any;
    } => {
        const { data, error, isLoading } = useSWR<{ data: QuestionType[] }>(`${import.meta.env.VITE_API}/question`, fetcher);

        return {
            questions: data ? data.data : [],
            questionsIsLoading: isLoading,
            questionsIsError: error,
        };
    };

    return {
        getUsers,
        getQuestions,
        getStatistics
    };
};