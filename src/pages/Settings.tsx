import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import settingsSchema from "@/schemas/settingSchema"

const Settings = () => {
    
    const settingForm = useForm<z.infer<typeof settingsSchema>>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            security_emails: true,
        },
    })

    function onSubmit(data: z.infer<typeof settingsSchema>) {
        console.log(data)
    }

    return (
        <div className="px-5 lg:px-24 py-5 gap-5">
            <Form {...settingForm}>
                <form onSubmit={settingForm.handleSubmit(onSubmit)} className="w-full space-y-6">
                    <div>
                        <h3 className="mb-4 text-lg font-medium">E-posta ayarları</h3>
                        <div className="space-y-4">
                            <FormField
                                control={settingForm.control}
                                name="marketing_emails"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Reklam bildirimleri
                                            </FormLabel>
                                            <FormDescription>
                                                Reklamlar hakkında e-posta bildirisi al.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={settingForm.control}
                                name="security_emails"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">Gizlilik</FormLabel>
                                            <FormDescription>
                                                Sorduğum sorularda ve gönderdiğim yanıtlarda ismim gözüksün.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <Button type="submit">Kaydet</Button>
                </form>
            </Form>
        </div>
    )
}

export default Settings