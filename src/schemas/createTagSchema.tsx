import { z } from "zod"

const createTagSchema = z.object({
    name: z.string().min(1, {
        message: "Tag ismi en az 1 karakterden oluşmalı.",
    }).max(32, {
        message: "Tag ismi en fazla 32 karakterden oluşabilir.",
    }),
})

export default createTagSchema