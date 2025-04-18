import { fetcher } from "@/lib/fetcher";
import { fetcherWithPutFormData } from "@/lib/fetcherWithPutFormData";
import QuestionType from "@/types/question/QuestionType";
import UserType from "@/types/UserType";
import useSWR from "swr";
import useSWRMutation from 'swr/mutation';


/*
interface UploadAvatarType {
    uuid: string;
    avatar: any
}
*/

const useUser = () => {

    /*
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
    */

    const {
        trigger: uploadAvatar,
        isMutating: uploadAvatarIsLoading,
        error: uploadAvatarIsError
    } = useSWRMutation(
        `${import.meta.env.VITE_API}/user/load-avatar`,
        (url, { arg }: { arg: { formData: FormData } }) => fetcherWithPutFormData(`${url}`, arg.formData)
    );

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
        questionsMutate: () => void;
    } => {
        const { data, error, isLoading, mutate } = useSWR(
            `${import.meta.env.VITE_API}/question/by/${uuid}`,
            fetcher
        );

        return {
            questions: data?.data !== undefined ? data.data : null,
            questionsIsLoading: isLoading,
            questionsIsError: error,
            questionsMutate: mutate
        };
    };

    return {
        uploadAvatar,
        uploadAvatarIsLoading,
        uploadAvatarIsError,
        getUserByUUID,
        getUserQuestions
    };
};

export default useUser;