import { z } from "zod"

const forgotPasswordPinSchema = z.object({
    pin: z.string().min(6, {
        message: "Tek kullanımlık şifre en az 6 karakterden oluşmalıdır.",
    }),
})

export default forgotPasswordPinSchema