import { fetcher } from "@/lib/fetcher";
import QuestionType from "@/types/question/QuestionType";
import UploadAvatarType from "@/types/user/UploadAvatarType";
import UserType from "@/types/UserType";
import useSWR from "swr";

const useUser = () => {

    const uploadAvatar = async (avatarData: UploadAvatarType) => {
        try {
            const formData = new FormData();

            formData.append('uuid', avatarData.uuid ?? '');

            const images = Object.values(avatarData.avatar);
            images.forEach((img: any) => {
                formData.append("avatar", img);
            });

            const response = await fetch(`${import.meta.env.VITE_API}/user/load-avatar`, {
                method: 'PUT',
                credentials: "include",
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload avatar.');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    };

    const getUserByUUID = (uuid: string): {
        user: UserType | null;
        userIsLoading: boolean;
        userIsError: any;
    } => {
        const { data, error, isLoading } = useSWR<{ data: UserType }>(
            `${import.meta.env.VITE_API}/user/${uuid}`,
            fetcher
        );

        return {
            user: data ? data.data : null,
            userIsLoading: isLoading,
            userIsError: error,
        };
    };

    const getUserQuestions = (uuid: string): {
        questions: QuestionType[] | null;
        questionsIsLoading: boolean;
        questionsIsError: any;
    } => {
        const { data, error, isLoading } = useSWR<{ data: QuestionType[] }>(
            `${import.meta.env.VITE_API}/question/by/${uuid}`,
            fetcher
        );

        return {
            questions: data ? data.data : null,
            questionsIsLoading: isLoading,
            questionsIsError: error,
        };
    };

    return {
        uploadAvatar,
        getUserByUUID,
        getUserQuestions
    };
};

export default useUser;