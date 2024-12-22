import { z } from "zod";

const profileSchema = z.object({
  username: z.string().min(5, {
    message: "Kullanıcı adı en az 5 karakterden oluşmalı.",
  }),
  firstName: z.string().min(5, {
    message: "İsminiz en az 5 karakterden oluşmalı.",
  }),
  lastName: z.string().min(5, {
    message: "Soyadınız en az 5 karakterden oluşmalı.",
  }),
  email: z.string().min(5, {
    message: "E-postanız en az 5 karakterden oluşmalı.",
  }),
  website: z.string().min(5, {
    message: "Websiteniz en az 5 karakterden oluşmalı.",
  }),
  about: z.string().min(5, {
    message: "Hakkımda en az 5 karakterden oluşmalı.",
  }),
  password: z.string().min(5, {
    message: "Şifre en az 5 karakterden oluşmalı.",
  }),
  passwordAgain: z.string().min(5, {
    message: "Şifre en az 5 karakterden oluşmalı.",
  }),
  picture: typeof window === 'undefined'
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
}).refine((val) => val.password === val.passwordAgain, {
  message: "Şifreler eşleşmiyor.",
  path: ["passwordAgain"],
});

export default profileSchema;