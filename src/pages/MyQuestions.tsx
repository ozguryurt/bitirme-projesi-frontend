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
import useUser from '@/hooks/useUser';
import { useAuth } from '@/providers/AuthProvider';
import QuestionType from '@/types/question/QuestionType';
import { formatDate } from '@/lib/formatDate';
import { Link } from 'react-router';
import useQuestion from '@/hooks/useQuestion';
import useModal from '@/hooks/useModal';
import LoadingIcon from '@/components/custom/LoadingIcon';
import { useToast } from "@/hooks/use-toast";

const MyQuestions = () => {
    const { userData } = useAuth()
    const { getUserQuestions } = useUser();
    const { questions, questionsIsLoading, questionsIsError, questionsMutate } = getUserQuestions(userData?.uuid!)
    const { deleteQuestion, deleteQuestionIsLoading } = useQuestion()
    const { showYesNoModal } = useModal()
    const { toast } = useToast()

    const handleDeleteQuestion = async (questionId: string) => {
        try {
            showYesNoModal({
                text: "Soruyu silmek istediğinize emin misiniz?",
                disabledStatus: deleteQuestionIsLoading,
                yesBtnFn: async () => {
                    const res = await deleteQuestion({ question_uuid: questionId!, user_uuid: userData?.uuid! });
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

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center gap-3 px-5 lg:px-24 py-5">
            {
                questionsIsError ? <>Bir hata meydana geldi.</> :
                    questionsIsLoading ? <LoadingIcon /> : questions ? <DataTable columns={columns} data={questions!} itemPerPage={5} /> : <>Soru bulunamadı.</>
            }
        </div>
    );
};

export default MyQuestions;