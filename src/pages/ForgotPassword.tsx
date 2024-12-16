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

import forgotPasswordSchema from '@/schemas/forgotPasswordSchema'
import { useToast } from "@/hooks/use-toast"
import forgotPasswordVerificationSchema from "@/schemas/forgotPasswordVerificationSchema"
import useModal from "@/hooks/useModal"

const ForgotPassword = () => {

    const { toast } = useToast()
    const { showModal } = useModal()

    const emailForm = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: ""
        },
    })

    const pinForm = useForm<z.infer<typeof forgotPasswordVerificationSchema>>({
        resolver: zodResolver(forgotPasswordVerificationSchema),
        defaultValues: {
            pin: "",
        },
    })

    function pinOnSubmit(data: z.infer<typeof forgotPasswordVerificationSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
        console.log(values)
        toast({
            title: "Bilgi",
            description: `Şifre sıfırlama kodu ${values.email} adresine gönderildi.`,
        })
        showModal("", "",
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
                    <Button type="submit">Devam</Button>
                </form>
            </Form>
        )
    }


    return (
        <>
            <div className="min-h-screen flex flex-col justify-center items-center gap-3">
                <Form {...emailForm}>
                    <form onSubmit={emailForm.handleSubmit(onSubmit)} className="space-y-8 w-9/12">
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
                        <Button type="submit" className="font-medium text-base text-white dark:text-zinc-800">Şifre sıfırlama bağlantısı gönder</Button>
                    </form>
                </Form>
            </div>
        </>
    )
}

export default ForgotPassword