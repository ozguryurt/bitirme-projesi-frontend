import { z } from "zod"

const loginSchema = z.object({
    username: z.string().min(5, {
        message: "Kullanıcı adı en az 5 karakterden oluşmalı.",
    }),
    password: z.string().min(5, {
        message: "Şifre en az 5 karakterden oluşmalı."
    })
})

export default loginSchema