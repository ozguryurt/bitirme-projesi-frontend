import LoadingPage from '@/components/custom/LoadingPage';
import useAuthStore from '@/stores/authStore';
import UserType from '@/types/UserType';
import { createContext, useContext, useEffect, ReactNode, useState } from 'react';

interface AuthContextType {
    loginWithEmail: (username: string, password: string) => Promise<boolean>;
    register: (username: string, password: string, passAgain: string, email: string, phone: string) => Promise<boolean>;
    logout: () => void;
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

    const loginWithEmail = async (email: string, password: string): Promise<boolean> => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API}/auth/login-with-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                //localStorage.setItem('token', data.data.token);

                let expires = "";
                const date = new Date();
                date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
                document.cookie = "token=" + (data.data.token || "") + expires + "; path=/";

                setUser(data.data.user);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const register = async (username: string, password: string, passAgain: string, email: string, phone: string): Promise<boolean> => {
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

            if (response.ok) {
                const data = await response.json();
                //localStorage.setItem('token', data.token);
                //setUser({ username });
                return true;
            }
            return false;
        } catch (error) {
            console.error('Register error:', error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
    }

    const check = async (): Promise<void> => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API}/auth/autologin`, {
                method: 'GET',
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
        register,
        check,
        logout,
        userData: user
    };

    return (
        <>
            {
                isLoading === true ?
                    <LoadingPage />
                    :
                    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
            }
        </>
    );
};