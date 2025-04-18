import { z } from "zod"

const newQuestionFormSchema = z.object({
    header: z.string().min(5, {
        message: "Başlık en az 5 karakterden oluşmalı.",
    }),
    content: z.string().min(10, {
        message: "İçerik en az 10 karakterden oluşmalı.",
    }),
    tags: z.array(z.string()).min(1, "En az bir kategori seçilmelidir."),
    form: z.any()
})

export default newQuestionFormSchema