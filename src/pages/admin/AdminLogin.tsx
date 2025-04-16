import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import loginSchema from '@/schemas/loginSchema'

const AdminLogin = () => {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
    function onSubmit(values: z.infer<typeof loginSchema>) {
        console.log(values)
    }
    return (
        <>
            <div className="min-h-screen flex flex-col justify-center items-center gap-3 px-5 lg:px-24 py-5">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-9/12">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium text-base text-zinc-800 dark:text-white">Kullanıcı adı</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Kullanıcı adı" {...field} className="font-medium text-base text-zinc-800 dark:text-white" />
                                    </FormControl>
                                    <FormMessage className="font-medium text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium text-base text-zinc-800 dark:text-white">Şifre</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Şifre" {...field} className="font-medium text-base text-zinc-800 dark:text-white" />
                                    </FormControl>
                                    <FormMessage className="font-medium text-xs" />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="font-medium text-base text-white dark:text-zinc-800">Giriş yap</Button>
                    </form>
                </Form>
            </div>
        </>
    )
}

export default AdminLogin