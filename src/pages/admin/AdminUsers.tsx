import ErrorPage from '@/components/custom/ErrorPage';
import LoadingPage from '@/components/custom/LoadingPage';

// DataTable columns
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from '@/components/custom/DataTable';
import UserType from '@/types/UserType';
import { useAdmin } from '@/hooks/admin/useAdmin';
import { Link } from 'react-router';

const AdminUsers = () => {
    const { getUsers } = useAdmin()
    const { users, usersIsLoading, usersIsError } = getUsers()

    const columns: ColumnDef<UserType>[] = [
        {
            accessorKey: "uuid",
            header: "UUID",
        },
        {
            accessorKey: "nickname",
            header: "Kullanıcı adı",
        },
        {
            accessorKey: "email",
            header: "E-posta",
        },
        {
            id: "actions",
            header: "İşlem",
            cell: ({ row }) => {
                const user = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Eylemler</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link to={`/profile/${user.uuid}`}>Kullanıcıyı görüntüle</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    if (usersIsError) return <ErrorPage />;

    if (usersIsLoading) return <LoadingPage />;

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center gap-3 px-5 lg:px-24 py-5">
            <DataTable columns={columns} data={users} itemPerPage={3} />
        </div>
    );
};

export default AdminUsers;