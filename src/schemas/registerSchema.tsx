import { z } from "zod"

const registerSchema = z.object({
    nickname: z.string().min(5, {
        message: "Kullanıcı adı en az 5 karakterden oluşmalı.",
    }),
    email: z.string().min(5, {
        message: "E-posta en az 5 karakterden oluşmalı.",
    }).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: "Geçerli bir e-posta adresi girin.",
    }),
    tel: z.string().min(10, {
        message: "Telefon numarası en az 10 karakterden oluşmalı.",
    }),
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

export default registerSchema