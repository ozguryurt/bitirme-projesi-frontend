import { useUsers, User } from '@/hooks/admin/useUsers';
import DataTable from '@/components/custom/admin/DataTable';
import ErrorPage from '@/components/custom/ErrorPage';
import LoadingPage from '@/components/custom/LoadingPage';

const AdminUsers = () => {
    const { users, isLoading, isError } = useUsers();

    const columns: { key: keyof User; label: string }[] = [
        { key: 'id', label: 'ID' },
        { key: 'username', label: 'Kullanıcı adı' },
        { key: 'email', label: 'E-posta' },
        { key: 'age', label: 'Yaş' },
    ];

    if (isError)
        return <ErrorPage />

    if (isLoading) return <LoadingPage />

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center gap-3 px-5 lg:px-24 py-5">
            <DataTable columns={columns} data={users} rowsPerPage={5} />
        </div>
    );
};

export default AdminUsers;