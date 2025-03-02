import { fetcher } from '@/lib/fetcher';
import useSWR from 'swr';

export interface User {
    id: number;
    username: string;
    email: string;
    age: number;
}

export const useUsers = () => {
    const { data, error } = useSWR('https://dummyjson.com/users', fetcher);

    const users: User[] = data
        ? data.users.map((user: User) => ({
            id: user.id,
            username: user.username,
            email: user.email,
            age: user.age,
        }))
        : [];

    return {
        users,
        isLoading: !data && !error,
        isError: error,
    };
};