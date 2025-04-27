import { z } from "zod";

const settingsSchema = z.object({
  nickname: z.string().min(5, {
    message: "Kullanıcı adı en az 5 karakterden oluşmalı.",
  }),
  name: z.string().min(3, {
    message: "İsminiz en az 3 karakterden oluşmalı.",
  }),
  tel: z.string().min(10, {
    message: "Telefon numarası en az 10 karakterden oluşmalı.",
  }),
  lastname: z.string().min(3, {
    message: "Soyadınız en az 3 karakterden oluşmalı.",
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
}).refine((val) => val.password === val.passwordAgain, {
  message: "Şifreler eşleşmiyor.",
  path: ["passwordAgain"],
});

export default settingsSchema;