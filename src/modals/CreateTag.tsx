import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import createTagSchema from "@/schemas/createTagSchema"
import { useAdmin } from "@/hooks/admin/useAdmin"
import { Loader2 } from "lucide-react"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

const CreateTag = ({ mutateFn }: { mutateFn: () => void }) => {

    const { createTag, createTagIsLoading } = useAdmin()
    const { toast } = useToast()

    const form = useForm<z.infer<typeof createTagSchema>>({
        resolver: zodResolver(createTagSchema),
        defaultValues: {
            name: ""
        },
    })

    async function onSubmit(values: z.infer<typeof createTagSchema>) {
        try {
            const res = await createTag({ name: values.name });
            if (res?.status === true) {
                toast({
                    title: "Bilgi",
                    description: res.message,
                })
                form.reset()
            }
            else
                toast({
                    title: "Bilgi",
                    description: res.message,
                })
            form.reset()
        } catch (error) {
            toast({
                title: "Bilgi",
                description: "Bir hata meydana geldi, daha sonra tekrar deneyin.",
            })
        } finally {
            mutateFn()
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder="Tag ismi"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={createTagIsLoading}>
                    {
                        createTagIsLoading ? (
                            <>
                                <Loader2 className="animate-spin" />
                                Lütfen bekleyin
                            </>
                        ) : "Oluştur"
                    }
                </Button>
            </form>
        </Form>
    )
}

export default CreateTag