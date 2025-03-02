import { fetcher } from "@/lib/fetcher";
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

    return {
        uploadAvatar,
        getUserByUUID
    };
};

export default useUser;