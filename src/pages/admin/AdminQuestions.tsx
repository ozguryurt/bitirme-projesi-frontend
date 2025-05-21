import { useAdmin } from '@/hooks/admin/useAdmin';
import ErrorPage from '@/components/custom/ErrorPage';
import LoadingPage from '@/components/custom/LoadingPage';

// DataTable columns
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash } from "lucide-react";
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
import QuestionType from '@/types/question/QuestionType';
import { formatDate } from '@/lib/formatDate';
import { Link } from 'react-router';
import { useToast } from '@/hooks/use-toast';
import useModal from '@/hooks/useModal';
import { useAuth } from '@/providers/AuthProvider';

const AdminQuestions = () => {
    const { userData } = useAuth()
    const { getQuestions, deleteQuestion, deleteQuestionIsLoading } = useAdmin()
    const { questions, questionsIsLoading, questionsIsError, questionsMutate } = getQuestions()
    const { showYesNoModal } = useModal()
    const { toast } = useToast()

    const handleDeleteQuestion = async (question_uuid: string) => {
        try {
            showYesNoModal({
                text: "Soruyu silmek istediğinize emin misiniz?",
                disabledStatus: deleteQuestionIsLoading,
                yesBtnFn: async () => {
                    const res = await deleteQuestion({ question_uuid: question_uuid, user_uuid: userData?.uuid! });
                    if (res?.status === true) {
                        toast({
                            title: "Bilgi",
                            description: res.message,
                        })
                        await questionsMutate()
                    }
                }
            })
        } catch (error) {
            toast({
                title: "Bilgi",
                description: "Bir hata meydana geldi, daha sonra tekrar deneyin.",
            })
        }
    }

    const columns: ColumnDef<QuestionType>[] = [
        {
            accessorKey: "uuid",
            header: "UUID",
        },
        {
            accessorKey: "CreatedAt",
            header: "Oluşturma",
            cell: ({ row }) => {
                return <>{formatDate(row.original.CreatedAt)}</>
            },
        },
        {
            accessorKey: "User.nickname",
            header: "Soran",
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
                            <DropdownMenuItem>
                                <Link to={`/profile/${question.User.uuid}`}>Kullanıcıyı görüntüle</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button variant={'destructive'} onClick={() => handleDeleteQuestion(question.uuid)}>
                                    <Trash /> Soruyu sil
                                </Button>
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

export default AdminQuestions;