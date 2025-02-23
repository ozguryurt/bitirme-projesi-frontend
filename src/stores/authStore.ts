import { create } from 'zustand'

import UserType from '@/types/UserType';

interface AuthState {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
    isLoading: boolean;
    setIsLoading: (newState: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setUser: (user: UserType | null) => set({ user }),
    isLoading: true,
    setIsLoading: (newState: boolean) => set({ isLoading: newState }),
}));

export default useAuthStore