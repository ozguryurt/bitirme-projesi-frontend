import { z } from "zod"

const loginSchema = z.object({
    email: z.string().min(5, {
        message: "E-posta en az 5 karakterden oluşmalı.",
    }).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: "Geçerli bir e-posta adresi girin.",
    }),
    password: z.string().min(5, {
        message: "Şifre en az 5 karakterden oluşmalı."
    })
})

export default loginSchema