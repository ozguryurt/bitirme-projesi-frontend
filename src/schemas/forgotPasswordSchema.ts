import { z } from "zod"

const forgotPasswordSchema = z.object({
    password: z.string().min(5, {
        message: "Şifre en az 5 karakterden oluşmalı."
    }),
    passwordAgain: z.string().min(5, {
        message: "Şifre en az 5 karakterden oluşmalı."
    })
}).refine((val) => val.password === val.passwordAgain, {
    message: "Şifreler eşleşmiyor.",
    path: ["passwordAgain"]
})

export default forgotPasswordSchema