import LoadingPage from '@/components/custom/LoadingPage';
import ThemeSelector from '@/components/custom/ThemeSelector';
import { fetcherWithBody } from '@/lib/fetcherWithBody';
import useAuthStore from '@/stores/authStore';
import UserType from '@/types/UserType';
import { createContext, useContext, useEffect, ReactNode, useState } from 'react';
import useSWRMutation from 'swr/mutation';

interface AuthContextType {
    loginWithEmail: ({ email, password }: { email: string, password: string }) => Promise<any>;
    loginIsLoading: boolean;
    loginIsError: boolean;
    register: ({ nickname, password, passAgain, email, tel }: { nickname: string, password: string, passAgain: string, email: string, tel: string }) => Promise<any>;
    registerIsLoading: boolean;
    registerIsError: boolean;
    logout: () => Promise<any>;
    logoutIsLoading: boolean;
    logoutIsError: boolean;
    check: () => Promise<void>;
    userData: UserType | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const { user, setUser } = useAuthStore();
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const { trigger: loginWithEmail, isMutating: loginIsLoading, error: loginIsError } = useSWRMutation(
        `${import.meta.env.VITE_API}/auth/login-with-email`,
        fetcherWithBody
    );

    const { trigger: logout, isMutating: logoutIsLoading, error: logoutIsError } = useSWRMutation(
        `${import.meta.env.VITE_API}/auth/logout`,
        fetcherWithBody
    );

    /*
    const loginWithEmail = async (email: string, password: string): Promise<any> => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API}/auth/login-with-email`, {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data.data.user);
                return data;
            }
            return data;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };
    */

    /*const register = async (username: string, password: string, passAgain: string, email: string, phone: string): Promise<any> => {
        if (password !== passAgain) {
            return false;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nickname: username, password, email, tel: phone }),
            });

            const data = await response.json();
            if (response.ok) {
                return data;
            }
            return data;
        } catch (error) {
            console.error('Register error:', error);
            return false;
        }
    };*/

    const { trigger: register, isMutating: registerIsLoading, error: registerIsError } = useSWRMutation(
        `${import.meta.env.VITE_API}/auth/signup`,
        fetcherWithBody
    );

    /*
    const logout = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API}/auth/logout`, {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (response.ok) {
                setUser(null);
                return data;
            }
            return data;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };
    */
    const check = async (): Promise<void> => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API}/auth/autologin`, {
                method: 'GET',
                credentials: "include",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.data.user);
            }
        } catch (error) {
            console.error('Check error:', error);
        }
        setIsLoading(false)
    };

    useEffect(() => {
        check();
    }, []);

    // Context değerleri
    const value = {
        loginWithEmail,
        loginIsLoading,
        loginIsError,

        logout,
        logoutIsLoading,
        logoutIsError,

        register,
        registerIsLoading,
        registerIsError,

        check,
        userData: user
    };

    return (
        <>
            {
                isLoading === true ?
                    <>
                        <LoadingPage />
                        <ThemeSelector />
                    </>
                    :
                    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
            }
        </>
    );
};