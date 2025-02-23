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
import profileSchema from "@/schemas/profileSchema"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Divider from "@/components/custom/Divider"
import { SquarePen, X } from "lucide-react"
import React, { useState } from "react"
import { useParams } from "react-router"
import { useAuth } from "@/providers/AuthProvider"

const Profile: React.FC = () => {

  const { userData } = useAuth()

  const [changePicture, setChangePicture] = useState<boolean>(false)
  const { userId } = useParams()

  const settingForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: userData!.nickname,
      firstName: userData!.name,
      lastName: userData!.lastname,
      email: userData!.email,
      website: userData!.lastname,
      about: userData!.lastname,
      password: "",
      passwordAgain: "",
      picture: undefined,
    },
  })

  const pictureRef = settingForm.register("picture");

  function onSubmit(data: z.infer<typeof profileSchema>) {
    console.log(data)
  }

  // Reset picture field
  const handleResetPicture = () => {
    settingForm.setValue("picture", undefined);
    setChangePicture(false);
  }

  return (
    <div className="flex justify-center items-center px-5 lg:px-24 py-5 gap-5">
      <Form {...settingForm}>
        <form onSubmit={settingForm.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full lg:w-6/12">
          <p>User ID: {userId}</p>
          <div className="flex justify-center items-center col-span-1 lg:col-span-2">
            {
              changePicture ?
                <FormField
                  control={settingForm.control}
                  name="picture"
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
                            {...pictureRef}
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
                :
                <div className="relative">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <SquarePen onClick={() => setChangePicture(!changePicture)} size={15} className="absolute -top-3 -right-3 cursor-pointer" />
                </div>
            }
          </div>
          <FormField
            control={settingForm.control}
            name="username"
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
            name="firstName"
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
            name="lastName"
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

export default Profile