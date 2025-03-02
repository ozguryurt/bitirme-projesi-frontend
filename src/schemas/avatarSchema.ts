import { z } from "zod";

const avatarSchema = z.object({
    avatar: typeof window === 'undefined'
        ? z.any() // Server-side, picture zorunlu değil
        : z
            .instanceof(FileList, { message: "Geçersiz dosya türü." })
            .refine(
                (files) => {
                    if (!files || files.length === 0) return true; // Eğer dosya yoksa geçerli kabul et
                    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
                    return Array.from(files).every(file => allowedTypes.includes(file.type));
                },
                {
                    message: "Sadece .png, .jpg ve .jpeg dosyaları kabul edilmektedir.",
                    path: ["picture"],
                }
            )
            .optional(), // Client-side, picture opsiyonel
})

export default avatarSchema;