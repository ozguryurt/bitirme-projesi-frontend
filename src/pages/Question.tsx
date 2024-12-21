import Divider from "@/components/custom/Divider"
import { Link, useParams } from "react-router"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import questionReplySendSchema from "@/schemas/questionReplySendSchema"
import { Button } from "@/components/ui/button"
import ReplyCard from "@/components/custom/ReplyCard"
import { SquarePen } from "lucide-react"

const Question = () => {

    const { questionId } = useParams<string>()

    const form = useForm<z.infer<typeof questionReplySendSchema>>({
        resolver: zodResolver(questionReplySendSchema),
        defaultValues: {
            content: ""
        },
    })

    function onSubmit(data: z.infer<typeof questionReplySendSchema>) {
        console.log("success")
    }

    return (
        <>
            <div className="w-full flex flex-col gap-3 px-5 lg:px-24 py-5">
                <div className="w-full flex justify-start items-center gap-3">
                    <p className="w-full font-extrabold text-3xl">
                        Lorem ipsum dolor sit amet. ({questionId})
                    </p>
                    <Link to={`/edit-question`}>
                        <SquarePen />
                    </Link>
                </div>
                <Link to={`/profil/10`} className="flex justify-start items-center gap-2">
                    <img src="https://www.gravatar.com/avatar/0dde57a178da66520b18e3a737b6d6ed?s=80&d=mp&r=g" alt="User profile picture" className="w-14 h-14 rounded-full" />
                    <div className="w-full flex flex-col justify-center items-start">
                        <p className="w-full truncate font-medium">
                            username
                        </p>
                        <p className="w-full truncate text-xs font-medium text-start">
                            1 saat önce
                        </p>
                    </div>
                </Link>
                <div className="question-content">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus distinctio debitis aliquam deserunt eum ut sapiente porro fugiat fuga! Suscipit quas dolorem libero labore debitis tempore cum quae reprehenderit illo quibusdam velit, commodi, omnis ducimus voluptatibus facere ipsum culpa? Natus hic dolorum consectetur quis nam expedita dignissimos, vitae dolores architecto corporis, consequatur dicta eum quos voluptatem iure alias ut velit. Quod saepe ab odio accusantium ex pariatur, cupiditate veniam voluptate enim nisi qui ratione atque cumque corrupti mollitia veritatis id sapiente, dolor provident et ea. Tempore dicta corrupti adipisci similique, maiores suscipit architecto iure quidem, veritatis quos expedita illum ratione accusantium nemo! Soluta assumenda nobis ducimus, omnis consequuntur quos adipisci laborum quibusdam voluptatibus ratione, inventore impedit eos facilis fugit velit unde molestiae a sed aliquid maiores sequi quidem repudiandae? Dolorum atque distinctio enim, dolore ab perspiciatis tenetur nostrum dolorem non magnam accusamus dolores soluta quis optio maiores, fugiat veniam nemo. Praesentium, tempora maiores? Culpa optio exercitationem omnis. Veritatis cum vel tempore quia libero consequuntur incidunt nostrum sequi sapiente obcaecati vero fuga quae repellendus fugiat explicabo facilis voluptatum quam quisquam, labore reprehenderit expedita nam assumenda repellat reiciendis! Placeat impedit accusantium nisi quas asperiores sequi ipsum iste dolorem quaerat recusandae eveniet optio amet nulla consequatur magnam, nihil sed veniam quisquam quod. Quam similique cupiditate corrupti culpa iste obcaecati, repudiandae dolores saepe sunt quidem voluptate amet quas, pariatur sit. Aspernatur earum officia dicta exercitationem, praesentium dolor dolorem a necessitatibus autem! Quos nulla minima officia modi distinctio ullam necessitatibus! Consectetur et quae qui fugit!
                </div>
                <div className="w-full flex flex-wrap gap-3">
                    <Link to={`/questions/tag/javascript`} className="font-medium text-blue-500 text-xs">#Javascript</Link>
                    <Link to={`/questions/tag/javascript`} className="font-medium text-blue-500 text-xs">#Javascript</Link>
                    <Link to={`/questions/tag/javascript`} className="font-medium text-blue-500 text-xs">#Javascript</Link>
                    <Link to={`/questions/tag/javascript`} className="font-medium text-blue-500 text-xs">#Javascript</Link>
                    <Link to={`/questions/tag/javascript`} className="font-medium text-blue-500 text-xs">#Javascript</Link>
                </div>
                <Divider />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        <p className="w-full font-bold text-2xl">
                                            Cevap yaz
                                        </p>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Cevabınız..."
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Gönder</Button>
                    </form>
                </Form>
                <Divider />
                <p className="w-full font-bold text-2xl">
                    Cevaplar (13)
                </p>
                <div className="w-full flex flex-col justify-start items-center gap-3">
                    <ReplyCard />
                    <ReplyCard />
                    <ReplyCard />
                    <ReplyCard />
                </div>
            </div>
        </>
    )
}

export default Question