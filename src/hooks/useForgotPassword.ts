import { fetcherWithBody } from '@/lib/fetcherWithBody';
import useSWRMutation from 'swr/mutation';

const useForgotPassword = () => {
    const { trigger: forgotPasswordSendEmail, isMutating: emailIsLoading, error: emailIsError } = useSWRMutation(
        `${import.meta.env.VITE_API}/auth/forgot_password`,
        fetcherWithBody
    );

    const { trigger: forgotPasswordSendCode, isMutating: codeIsLoading, error: codeIsError } = useSWRMutation(
        `${import.meta.env.VITE_API}/auth/password_reset`,
        fetcherWithBody
    );

    const { trigger: forgotPasswordChangePassword, isMutating: changePasswordIsLoading, error: changePasswordError } = useSWRMutation(
        `${import.meta.env.VITE_API}/auth/password_reset/verify`,
        fetcherWithBody
    );

    return {
        forgotPasswordSendEmail,
        emailIsLoading,
        emailIsError,
        forgotPasswordSendCode,
        codeIsLoading,
        codeIsError,
        forgotPasswordChangePassword,
        changePasswordIsLoading,
        changePasswordError
    };
};

export default useForgotPassword;