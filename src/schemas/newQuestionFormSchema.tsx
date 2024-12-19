import { z } from "zod"

const newQuestionFormSchema = z.object({
    title: z.string().min(10, {
        message: "Başlık en az 10 karakterden oluşmalı.",
    }),
    body: z.string().min(50, {
        message: "İçerik en az 50 karakterden oluşmalı.",
    }),
    frameworks: z.array(z.string()).min(1, "En az bir kategori seçilmelidir."),
})

export default newQuestionFormSchema