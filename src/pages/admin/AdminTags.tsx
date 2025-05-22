import ErrorPage from '@/components/custom/ErrorPage';
import LoadingPage from '@/components/custom/LoadingPage';

// DataTable columns
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Plus, Trash } from "lucide-react";
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
import { useAdmin } from '@/hooks/admin/useAdmin';
import useModal from '@/hooks/useModal';
import { useToast } from '@/hooks/use-toast';
import QuestionTagType from '@/types/question/QuestionTagType';
import CreateTag from '@/modals/CreateTag';

const AdminTags = () => {
    const { getTags, deleteTag, deleteTagIsLoading } = useAdmin()
    const { tags, tagsIsLoading, tagsIsError, tagsMutate } = getTags()
    const { showModal, showYesNoModal } = useModal()
    const { toast } = useToast()

    const handleNewTagButton = () => {
        showModal({
            title: "Yeni tag oluştur",
            description: "",
            body: <CreateTag mutateFn={tagsMutate} />
        })
    }

    const handleDeleteTag = async (tagUuid: string) => {
        try {
            showYesNoModal({
                text: "Tagı silmek istediğinize emin misiniz?",
                disabledStatus: deleteTagIsLoading,
                yesBtnFn: async () => {
                    const res = await deleteTag({ tag_uuid: tagUuid });
                    if (res?.status === true) {
                        toast({
                            title: "Bilgi",
                            description: res.message,
                        })
                        await tagsMutate()
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


    const columns: ColumnDef<QuestionTagType>[] = [
        {
            accessorKey: "uuid",
            header: "UUID",
        },
        {
            accessorKey: "name",
            header: "İsim",
        },
        {
            id: "actions",
            header: "İşlem",
            cell: ({ row }) => {
                const tag = row.original;

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
                                <Button variant={'destructive'} onClick={() => handleDeleteTag(tag.uuid)}>
                                    <Trash /> Tagı sil
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    if (tagsIsError) return <ErrorPage />;

    if (tagsIsLoading) return <LoadingPage />;

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center gap-3 px-5 lg:px-24 py-5">
            <div className="w-full flex justify-start items-center">
                <Button onClick={handleNewTagButton}><Plus /> Yeni tag</Button>
            </div>
            <DataTable
                columns={columns}
                data={tags}
                itemPerPage={7}
                filterColumn="name"
                filterPlaceholder="İsme göre ara..."
            />
        </div>
    );
};

export default AdminTags;