import { z } from "zod"

const questionReplySendSchema = z.object({
    content: z.string().min(5, {
        message: "Cevabınız en az 5 karakterden oluşmalı.",
    }).max(2048, {
        message: "Cevabınız en fazla 2048 karakterden oluşabilir.",
    }),
})

export default questionReplySendSchema