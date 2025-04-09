import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import settingsSchema from "@/schemas/settingsSchema"
import { Input } from "@/components/ui/input"
import Divider from "@/components/custom/Divider"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/providers/AuthProvider"

const Settings = () => {

    const { userData } = useAuth()

    const settingForm = useForm<z.infer<typeof settingsSchema>>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            nickname: userData?.nickname,
            name: userData?.name,
            lastname: userData?.lastname,
            email: userData?.email,
            website: userData?.website,
            about: userData?.about,
            password: "",
            passwordAgain: ""
        },
    })

    function onSubmit(data: z.infer<typeof settingsSchema>) {
        console.log(data)
    }

    return (
        <div className="flex justify-center items-center px-5 lg:px-24 py-5 gap-5">
            <Form {...settingForm}>
                <form onSubmit={settingForm.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full lg:w-6/12">
                    <FormField
                        control={settingForm.control}
                        name="nickname"
                        render={({ field }) => (
                            <FormItem className="col-span-1 lg:col-span-2">
                                <FormLabel className="font-medium text-base text-zinc-800 dark:text-white">Kullanıcı adı</FormLabel>
                                <FormControl>
                                    <Input placeholder="Kullanıcı adı" {...field} className="font-medium text-base text-zinc-800 dark:text-white" disabled />
                                </FormControl>
                                <FormMessage className="font-medium text-xs" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={settingForm.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="col-span-1">
                                <FormLabel className="font-medium text-base text-zinc-800 dark:text-white">Ad</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ad" {...field} className="font-medium text-base text-zinc-800 dark:text-white" />
                                </FormControl>
                                <FormMessage className="font-medium text-xs" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={settingForm.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem className="col-span-1">
                                <FormLabel className="font-medium text-base text-zinc-800 dark:text-white">Soyad</FormLabel>
                                <FormControl>
                                    <Input placeholder="Soyad" {...field} className="font-medium text-base text-zinc-800 dark:text-white" />
                                </FormControl>
                                <FormMessage className="font-medium text-xs" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={settingForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="col-span-1">
                                <FormLabel className="font-medium text-base text-zinc-800 dark:text-white">E-posta</FormLabel>
                                <FormControl>
                                    <Input placeholder="E-posta" {...field} className="font-medium text-base text-zinc-800 dark:text-white" />
                                </FormControl>
                                <FormMessage className="font-medium text-xs" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={settingForm.control}
                        name="website"
                        render={({ field }) => (
                            <FormItem className="col-span-1">
                                <FormLabel className="font-medium text-base text-zinc-800 dark:text-white">Website adresi</FormLabel>
                                <FormControl>
                                    <Input placeholder="Website adresi" {...field} className="font-medium text-base text-zinc-800 dark:text-white" />
                                </FormControl>
                                <FormMessage className="font-medium text-xs" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={settingForm.control}
                        name="about"
                        render={({ field }) => (
                            <FormItem className="col-span-1 lg:col-span-2">
                                <FormLabel className="font-medium text-base text-zinc-800 dark:text-white">Hakkımda</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Hakkımda" {...field} className="font-medium text-base text-zinc-800 dark:text-white" />
                                </FormControl>
                                <FormMessage className="font-medium text-xs" />
                            </FormItem>
                        )}
                    />
                    <Divider customClass="col-span-1 lg:col-span-2" />
                    <FormField
                        control={settingForm.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="col-span-1">
                                <FormLabel className="font-medium text-base text-zinc-800 dark:text-white">Şifre</FormLabel>
                                <FormControl>
                                    <Input placeholder="Şifre" {...field} className="font-medium text-base text-zinc-800 dark:text-white" />
                                </FormControl>
                                <FormMessage className="font-medium text-xs" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={settingForm.control}
                        name="passwordAgain"
                        render={({ field }) => (
                            <FormItem className="col-span-1">
                                <FormLabel className="font-medium text-base text-zinc-800 dark:text-white">Şifre (tekrar)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Şifre (tekrar)" {...field} className="font-medium text-base text-zinc-800 dark:text-white" />
                                </FormControl>
                                <FormMessage className="font-medium text-xs" />
                            </FormItem>
                        )}
                    />
                    <Button className="col-span-1 lg:col-span-2" type="submit">Güncelle</Button>
                </form>
            </Form>
        </div>
    )
}

export default Settings