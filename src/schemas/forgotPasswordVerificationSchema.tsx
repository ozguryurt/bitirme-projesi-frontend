import { z } from "zod"

const forgotPasswordVerificationSchema = z.object({
    pin: z.string().min(6, {
        message: "Tek kullanımlık şifre en az 6 karakterden oluşmalıdır.",
    }),
})

export default forgotPasswordVerificationSchema