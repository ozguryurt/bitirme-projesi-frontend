import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormDescription,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import loginSchema from '@/schemas/loginSchema'

const Login = () => {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
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
                            name="username"
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
                                    <FormDescription>
                                        <Link to="/forgot-password" className="font-medium text-xs text-blue-500">Şifremi unuttum</Link>
                                    </FormDescription>
                                    <FormMessage className="font-medium text-xs" />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="font-medium text-base text-white dark:text-zinc-800">Giriş yap</Button>
                    </form>
                </Form>
                <p className="font-medium text-sm text-zinc-800 dark:text-white">Bir hesabın yok mu? <Link to="/register" className="text-blue-500">Buraya</Link> tıklayarak bir tane oluştur!</p>
            </div>
        </>
    )
}

export default Login