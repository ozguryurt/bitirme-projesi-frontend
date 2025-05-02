import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Loader2, SquarePen } from "lucide-react"
import React, { useState } from "react"
import { useParams } from "react-router"
import { useAuth } from "@/providers/AuthProvider"
import useUser from "@/hooks/useUser"
import { useToast } from "@/hooks/use-toast"
import avatarSchema from "@/schemas/avatarSchema"
import LoadingIcon from "@/components/custom/LoadingIcon"
import QuestionCard from "@/components/custom/QuestionCard"
import Divider from "@/components/custom/Divider"

const Profile: React.FC = () => {

  const { userData, check } = useAuth()
  const { userId } = useParams()
  const { uploadAvatar, uploadAvatarIsLoading, getUserByUUID, getUserQuestions } = useUser()
  const { user, userIsLoading, userIsError } = getUserByUUID(userId!);
  const { questions, questionsIsLoading, questionsIsError } = getUserQuestions(userId!);
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
      const formData_ = new FormData();
      formData_.append('uuid', userData?.uuid!);
      const images = Object.values(data.avatar);
      images.forEach((img: any) => {
        formData_.append("avatar", img);
      });
      const res = await uploadAvatar({ formData: formData_ })
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
        userIsError ? <>Bir hata meydana geldi.</> :
          userIsLoading ? <LoadingIcon /> : user ?
            <div className="flex flex-col justify-center items-center px-5 lg:px-24 py-5 gap-5">
              <div className="flex flex-col justify-center items-center gap-3">
                {
                  changePicture ?
                    <Form {...avatarForm}>
                      <form onSubmit={avatarForm.handleSubmit(onSubmit)} className="flex flex-col gap-x-6 gap-y-2 w-full">
                        <FormField
                          control={avatarForm.control}
                          name="avatar"
                          render={({ field }) => {
                            return (
                              <FormItem className="w-full">
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
                        <Button className="col-span-1 lg:col-span-2" type="submit" disabled={uploadAvatarIsLoading}>
                          {
                            uploadAvatarIsLoading ? (
                              <>
                                <Loader2 className="animate-spin" />
                                Lütfen bekleyin
                              </>
                            ) : "Güncelle"
                          }
                        </Button>
                        <Button className="col-span-1 lg:col-span-2" onClick={handleResetPicture} variant="destructive">İptal</Button>
                      </form>
                    </Form>
                    :
                    <div className="relative">
                      <Avatar className="w-32 h-32">
                        <AvatarImage src={`${import.meta.env.VITE_IMAGE_BASEPATH}/${user.avatar}`} />
                        <AvatarFallback>{user.nickname}</AvatarFallback>
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
              <Divider />
              <div className="w-full flex flex-col justify-center items-center gap-3">
                <p className="text-center font-bold text-xl">@{user.nickname} soruları</p>
                {
                  questionsIsError ? <>Bir hata meydana geldi.</> :
                    questionsIsLoading ? <LoadingIcon /> : questions ?
                      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
                        {
                          questions.slice(0, 3).map((question, index) => {
                            return (
                              <QuestionCard
                                key={index}
                                data={question}
                              />
                            );
                          })
                        }
                      </div>
                      :
                      <p className="text-center">Soru bulunamadı.</p>
                }
              </div>
            </div>
            :
            <p className="text-center">Kullanıcı bulunamadı.</p>
      }
    </>
  )
}

export default Profile