import { Link, useNavigate } from "react-router"
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
import { useAuth } from "@/providers/AuthProvider"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"


const Register = () => {

    const { register, registerIsLoading } = useAuth()
    const { toast } = useToast()
    let navigate = useNavigate();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            nickname: "",
            email: "",
            password: "",
            passwordAgain: "",
            tel: ""
        },
    })

    async function onSubmit(values: z.infer<typeof registerSchema>) {
        try {
            const res = await register({
                "nickname": values.nickname,
                "password": values.password,
                "passAgain": values.passwordAgain,
                "email": values.email,
                "tel": values.tel,
            })
            if (res.status === true) {
                toast({
                    title: "Bilgi",
                    description: `Başarıyla kayıt oldunuz.`,
                })
                navigate("/login");
            }
            else {
                toast({
                    title: "Bilgi",
                    description: res.message[0],
                })
            }
        } catch (error) {
            toast({
                title: "Bilgi",
                description: `Bir hata meydana geldi, daha sonra tekrar deneyin.`,
            })
        }
    }

    return (
        <>
            <div className="min-h-screen flex flex-col justify-center items-center px-5 lg:px-24 py-5 gap-5">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full lg:w-5/12">
                        <FormField
                            control={form.control}
                            name="nickname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium text-base text-zinc-800 dark:text-white">Kullanıcı adı</FormLabel>
                                    <FormControl>
                                        <Input placeholder="exampleusername" {...field} className="font-medium text-base text-zinc-800 dark:text-white" />
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
                                        <Input placeholder="example@mail.com" {...field} className="font-medium text-base text-zinc-800 dark:text-white" />
                                    </FormControl>
                                    <FormMessage className="font-medium text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tel"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium text-base text-zinc-800 dark:text-white">Telefon numarası</FormLabel>
                                    <FormControl>
                                        <Input placeholder="xxx xxx xx xx" {...field} className="font-medium text-base text-zinc-800 dark:text-white" />
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
                                        <Input placeholder="•••••" type="password" {...field} className="font-medium text-base text-zinc-800 dark:text-white" />
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
                                        <Input placeholder="•••••" type="password" {...field} className="font-medium text-base text-zinc-800 dark:text-white" />
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
                        <Button type="submit" className="font-medium text-base text-white dark:text-zinc-800" disabled={registerIsLoading}>
                            {
                                registerIsLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" />
                                        Lütfen bekleyin
                                    </>
                                ) : "Kayıt ol"
                            }
                        </Button>
                        <p className="font-medium text-sm text-zinc-800 dark:text-white">Bir hesabın var mı? <Link to="/login" className="text-blue-500">Buraya</Link> tıklayarak giriş yap!</p>
                    </form>
                </Form>
            </div>
        </>
    )
}

export default Register