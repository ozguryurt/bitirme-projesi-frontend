import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import forgotPasswordEmailSchema from '@/schemas/forgotPasswordEmailSchema'
import forgotPasswordPinSchema from "@/schemas/forgotPasswordPinSchema"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import forgotPasswordSchema from "@/schemas/forgotPasswordSchema"
import useForgotPassword from "@/hooks/useForgotPassword"
import { Loader2 } from "lucide-react"
import { Link } from "react-router"

const ForgotPassword = () => {

    const [step, setStep] = useState<number>(0)

    const {
        forgotPasswordSendEmail, emailIsLoading,
        forgotPasswordSendCode, codeIsLoading,
        forgotPasswordChangePassword, changePasswordIsLoading
    } = useForgotPassword()

    const { toast } = useToast()

    const emailForm = useForm<z.infer<typeof forgotPasswordEmailSchema>>({
        resolver: zodResolver(forgotPasswordEmailSchema),
        defaultValues: {
            email: ""
        },
    })

    const pinForm = useForm<z.infer<typeof forgotPasswordPinSchema>>({
        resolver: zodResolver(forgotPasswordPinSchema),
        defaultValues: {
            pin: "",
        },
    })

    const passwordForm = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            password: "",
            passwordAgain: ""
        },
    })

    async function emailOnSubmit(values: z.infer<typeof forgotPasswordEmailSchema>) {
        try {
            const res = await forgotPasswordSendEmail({
                "Email": values.email
            })
            if (res?.status === true) {
                toast({
                    title: "Bilgi",
                    description: res.message,
                })
                setStep(1)
            } else {
                toast({
                    title: "Bilgi",
                    description: res.message,
                })
            }
        } catch (error) {
            toast({
                title: "Bilgi",
                description: `Beklenmeyen bir hata meydana geldi.`,
            })
        }
    }

    async function pinOnSubmit(data: z.infer<typeof forgotPasswordPinSchema>) {
        try {
            const res = await forgotPasswordSendCode({
                "Email": emailForm.getValues("email"),
                "Code": data.pin
            })
            if (res?.status === true) {
                toast({
                    title: "Bilgi",
                    description: res.message,
                })
                setStep(2)
            } else {
                toast({
                    title: "Bilgi",
                    description: res.message,
                })
            }
        } catch (error) {
            toast({
                title: "Bilgi",
                description: `Beklenmeyen bir hata meydana geldi.`,
            })
        }
    }

    async function passwordOnSubmit(data: z.infer<typeof forgotPasswordSchema>) {
        try {
            const res = await forgotPasswordChangePassword({
                "Email": emailForm.getValues("email"),
                "password": data.password,
                "repassword": data.passwordAgain
            })
            if (res?.status === true) {
                toast({
                    title: "Bilgi",
                    description: `Şifrenizi başarıyla değiştirdiniz.`,
                })
                setStep(3)
            } else {
                toast({
                    title: "Bilgi",
                    description: res.message,
                })
            }
        } catch (error) {
            toast({
                title: "Bilgi",
                description: `Beklenmeyen bir hata meydana geldi.`,
            })
        }
    }

    return (
        <>
            <div className="min-h-screen flex flex-col justify-center items-center gap-3 px-5 lg:px-24 py-5">
                {
                    step === 0 &&
                    <Form {...emailForm}>
                        <form onSubmit={emailForm.handleSubmit(emailOnSubmit)} className="space-y-8 w-9/12">
                            <FormField
                                control={emailForm.control}
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
                            <Button type="submit" className="font-medium text-base text-white dark:text-zinc-800" disabled={emailIsLoading}>
                                {
                                    emailIsLoading ? (
                                        <>
                                            <Loader2 className="animate-spin" />
                                            Lütfen bekleyin
                                        </>
                                    ) : "Şifre sıfırlama bağlantısı gönder"
                                }
                            </Button>
                        </form>
                    </Form>
                }
                {
                    step === 1 &&
                    <Form {...pinForm}>
                        <form onSubmit={pinForm.handleSubmit(pinOnSubmit)} className="w-full space-y-6 flex flex-col justify-center items-center">
                            <FormField
                                control={pinForm.control}
                                name="pin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-medium text-base text-zinc-800 dark:text-white flex justify-center items-center">Tek Kullanımlık Kod</FormLabel>
                                        <FormControl>
                                            <InputOTP maxLength={6} {...field}>
                                                <InputOTPGroup className="w-full flex justify-center items-center">
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                    <InputOTPSlot index={3} />
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSlot index={5} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormDescription>
                                            Lütfen e-posta adresinize gönderilen tek kullanımlık kodu giriniz.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={codeIsLoading}>
                                {
                                    codeIsLoading ? (
                                        <>
                                            <Loader2 className="animate-spin" />
                                            Lütfen bekleyin
                                        </>
                                    ) : "Devam"
                                }
                            </Button>
                        </form>
                    </Form>
                }
                {
                    step === 2 &&
                    <Form {...passwordForm}>
                        <form onSubmit={passwordForm.handleSubmit(passwordOnSubmit)} className="space-y-8 w-9/12">
                            <FormField
                                control={passwordForm.control}
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
                                control={passwordForm.control}
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
                            <Button type="submit" className="font-medium text-base text-white dark:text-zinc-800" disabled={changePasswordIsLoading}>
                                {
                                    changePasswordIsLoading ? (
                                        <>
                                            <Loader2 className="animate-spin" />
                                            Lütfen bekleyin
                                        </>
                                    ) : "Şifreyi değiştir"
                                }
                            </Button>
                        </form>
                    </Form>
                }
                {
                    step === 3 &&
                    <p>
                        <Link to={'/login'} className="text-blue-500">Buraya</Link> tıklayarak giriş yapın.
                    </p>
                }
            </div>
        </>
    )
}

export default ForgotPassword