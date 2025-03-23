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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { SquarePen, X } from "lucide-react"
import React, { useState } from "react"
import { useParams } from "react-router"
import { useAuth } from "@/providers/AuthProvider"
import useUser from "@/hooks/useUser"
import { useToast } from "@/hooks/use-toast"
import avatarSchema from "@/schemas/avatarSchema"

const Profile: React.FC = () => {

  const { userData, check } = useAuth()
  const { userId } = useParams()
  const { uploadAvatar, getUserByUUID } = useUser()
  const { user, userIsLoading, userIsError } = getUserByUUID(userId!);
  const { toast } = useToast()

  const [changePicture, setChangePicture] = useState<boolean>(false)

  const avatarForm = useForm<z.infer<typeof avatarSchema>>({
    resolver: zodResolver(avatarSchema),
    defaultValues: {
      avatar: undefined,
    },
  })

  const avatarRef = avatarForm.register("avatar");

  async function onSubmit(data: z.infer<typeof avatarSchema>) {
    try {
      const res = await uploadAvatar({ ...data, uuid: userData?.uuid })
      if (res.status === true)
        toast({
          title: "Bilgi",
          description: `Profil resminizi başarıyla değiştirdiniz.`,
        })
      else
        toast({
          title: "Bilgi",
          description: `Bir hata meydana geldi, daha sonra tekrar deneyin.`,
        })
    } catch (error: any) {
      toast({
        title: "Bilgi",
        description: error.toString(),
      })
    }
    finally {
      await check()
    }
  }

  const handleResetPicture = () => {
    avatarForm.setValue("avatar", undefined);
    setChangePicture(false);
  }

  return (
    <>
      {
        userIsLoading === true ?
          <>Yükleniyor...</>
          :
          user !== null ?
            <div className="flex justify-center items-center px-5 lg:px-24 py-5 gap-5">
              <div className="flex justify-center items-center flex-col gap-3">
                {
                  changePicture ?
                    <Form {...avatarForm}>
                      <form onSubmit={avatarForm.handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
                        <FormField
                          control={avatarForm.control}
                          name="avatar"
                          render={({ field }) => {
                            return (
                              <FormItem className="w-full">
                                <div className="flex justify-start items-center gap-3">
                                  <FormLabel className="font-medium text-base text-zinc-800 dark:text-white">Profil resmi</FormLabel>
                                  <X onClick={handleResetPicture} size={15} className="cursor-pointer" />
                                </div>
                                <FormControl>
                                  <Input
                                    type="file"
                                    placeholder="shadcn"
                                    {...avatarRef}
                                    onChange={(event) => {
                                      field.onChange(event.target?.files?.[0] ?? undefined);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage className="font-medium text-xs" />
                              </FormItem>
                            );
                          }}
                        />
                        <Button className="col-span-1 lg:col-span-2" type="submit">Güncelle</Button>
                      </form>
                    </Form>
                    :
                    <div className="relative">
                      <Avatar className="w-32 h-32">
                        <AvatarImage src={`${import.meta.env.VITE_IMAGE_BASEPATH}/${user.avatar}`} />
                        <AvatarFallback>{userData?.nickname}</AvatarFallback>
                      </Avatar>
                      {
                        userData &&
                        userData.uuid === userId &&
                        <SquarePen onClick={() => setChangePicture(!changePicture)} size={15} className="absolute -top-3 -right-3 cursor-pointer" />
                      }
                    </div>
                }
                <p className="font-bold text-xl">@{user.nickname}</p>
                <p className="font-medium text-sm">{user.email}</p>
                <p className="font-medium text-sm">{user.website}</p>
                <p className="font-medium text-sm">{user.about}</p>
              </div>
            </div>
            :
            <>Veri bulunamadı.</>
      }
    </>
  )
}

export default Profile