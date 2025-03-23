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
import useUser from '@/hooks/useUser';
import { useAuth } from '@/providers/AuthProvider';
import QuestionType from '@/types/question/QuestionType';
import { formatDate } from '@/lib/formatDate';
import { Link } from 'react-router';

const MyQuestions = () => {
    const { userData } = useAuth()
    const { getUserQuestions } = useUser();
    const { questions, questionsIsLoading, questionsIsError } = getUserQuestions(userData?.uuid!)

    const columns: ColumnDef<QuestionType>[] = [
        {
            accessorKey: "uuid",
            header: "ID",
        },
        {
            accessorKey: "header",
            header: "Başlık",
        },
        {
            accessorKey: "CreatedAd",
            header: "Oluşturma",
            cell: ({ row }) => {
                return <>{formatDate(row.original.CreatedAt)}</>
            },
        },
        {
            id: "actions",
            header: "İşlem",
            cell: ({ row }) => {
                const question = row.original;

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
                                <Link to={`/question/${question.uuid}`}>Soruya git</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    if (questionsIsError) return <ErrorPage />;

    if (questionsIsLoading) return <LoadingPage />;

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center gap-3 px-5 lg:px-24 py-5">
            <DataTable columns={columns} data={questions!} itemPerPage={5} />
        </div>
    );
};

export default MyQuestions;