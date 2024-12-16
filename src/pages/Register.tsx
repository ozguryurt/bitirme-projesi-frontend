import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
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

import registerSchema from '@/schemas/registerSchema'


const Register = () => {
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",  // Default email alanını da ekliyoruz
            password: "",
            passwordAgain: "" // passwordAgain için de varsayılan değer ekliyoruz
        },
    })

    function onSubmit(values: z.infer<typeof registerSchema>) {
        console.log(values)  // Burada form verilerini işleyebilirsiniz
        // Form verilerini backend'e gönderme işlemi burada yapılabilir.
    }

    return (
        <>
            <div className="min-h-screen flex flex-col justify-center items-center gap-3">
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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium text-base text-zinc-800 dark:text-white">E-posta</FormLabel>
                                    <FormControl>
                                        <Input placeholder="E-posta" {...field} className="font-medium text-base text-zinc-800 dark:text-white" />
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
                                        <Input placeholder="Şifre" type="password" {...field} className="font-medium text-base text-zinc-800 dark:text-white" />
                                    </FormControl>
                                    <FormMessage className="font-medium text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="passwordAgain"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium text-base text-zinc-800 dark:text-white">Şifre (tekrar)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Şifre (tekrar)" type="password" {...field} className="font-medium text-base text-zinc-800 dark:text-white" />
                                    </FormControl>
                                    <FormMessage className="font-medium text-xs" />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                <Link to="/tos" className="text-blue-500">Kullanıcı Sözleşmesi</Link>'ni kabul ediyorum.
                            </label>
                        </div>
                        <Button type="submit" className="font-medium text-base text-white dark:text-zinc-800">Kaydol</Button>
                    </form>
                </Form>
                <p className="font-medium text-sm text-zinc-800 dark:text-white">Bir hesabın var mı? <Link to="/login" className="text-blue-500">Buraya</Link> tıklayarak giriş yap!</p>
            </div>
        </>
    )
}

export default Register