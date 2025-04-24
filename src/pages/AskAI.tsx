import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Info, Loader2, SendIcon } from "lucide-react"
import { useAuth } from "@/providers/AuthProvider"
import useModal from "@/hooks/useModal"
import useQuestion from "@/hooks/useQuestion"
import { formatDate } from "@/lib/formatDate"

type Message = {
    id: string,
    content: string,
    role: "user" | "assistant",
    timestamp: Date
}

const AskAI = () => {

    const { userData } = useAuth()
    const { showModal } = useModal()
    const { askAI, askAIIsLoading, askAIIsError } = useQuestion()

    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        setInput("")

        try {
            const res = await askAI({ question: input })
            setMessages((prev) => [...prev, res.user])
            setMessages((prev) => [...prev, res.assistant])
        } catch (err) {
            showModal({
                title: "Başarısız",
                description: "Bir hata meydana geldi.",
                body: ""
            })
        }
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, askAIIsLoading])

    const handleAIClick = () => {
        showModal({
            title: "StackAI nedir?",
            description: "StackAI, Stackoverflow platformundaki mevcut soru-cevap verilerinden eğitilen Türkçe destekli bir yapay zeka modelidir.",
            body: ""
        })
    }

    return (
        <div className="w-full flex flex-col gap-3 px-5 lg:px-24 py-5">
            <div className="flex items-center gap-2 mb-4">
                <Avatar>
                    <AvatarImage src="/aiavatar.png" />
                    <AvatarFallback>StackAI</AvatarFallback>
                </Avatar>
                <h1 className="text-xl font-semibold">StackAI</h1>
                <Info size={15} onClick={handleAIClick} className="cursor-pointer" />
            </div>

            <ScrollArea className="h-[40rem] w-full rounded-md border p-5">
                <div className="space-y-4">
                    {
                        messages.length === 0 &&
                        <div className="flex flex-col justify-center items-center gap-2">
                            <p className="font-bold text-3xl text-center bg-gradient-to-r from-blue-500 to-red-400 bg-clip-text text-transparent">Merhaba, {userData?.nickname}.</p>
                            <p className="font-medium text-base text-center">Nasıl yardımcı olabilirim?</p>
                        </div>
                    }
                    {messages.map((message) => (
                        <>
                            <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                                {message.role === "assistant" && (
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src="/aiavatar.png" />
                                        <AvatarFallback>StackAI</AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={`flex flex-col gap-1 ${message.role === "user" ? "items-end" : "items-start"}`}>
                                    <div
                                        className={`rounded-lg px-4 py-2 whitespace-pre-line ${message.role === "user"
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted"
                                            }`}
                                    >
                                        {message.content}
                                    </div>
                                    <span className="text-xs opacity-70 mt-1 text-right">
                                        {formatDate(message.timestamp.toString())}
                                    </span>
                                </div>
                                {message.role === "user" && (
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={`${import.meta.env.VITE_IMAGE_BASEPATH}/${userData?.avatar}`} />
                                        <AvatarFallback>{userData?.nickname}</AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        </>
                    ))}
                    {askAIIsError ? <>Bir hata meydana geldi.</> :
                        askAIIsLoading && (
                            <>
                                <div className="flex gap-3 justify-end">
                                    <div className={`flex flex-col gap-1 items-start`}>
                                        <div
                                            className={`rounded-lg px-4 py-2 bg-primary`}
                                        >
                                            <Loader2 className="animate-spin dark:text-white text-zinc-800" />
                                        </div>
                                    </div>
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={`${import.meta.env.VITE_IMAGE_BASEPATH}/${userData?.avatar}`} />
                                        <AvatarFallback>{userData?.nickname}</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="flex gap-3 justify-start">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src="/aiavatar.png" />
                                        <AvatarFallback>StackAI</AvatarFallback>
                                    </Avatar>
                                    <div className={`flex flex-col gap-1 items-start`}>
                                        <div
                                            className={`rounded-lg px-4 py-2 bg-muted`}
                                        >
                                            <div className="flex space-x-2">
                                                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                                                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-75"></div>
                                                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-150"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    <div ref={messagesEndRef} />
                </div>
            </ScrollArea>

            <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="StackAI'a sorun..."
                    className="flex-1"
                />
                <Button type="submit" disabled={askAIIsLoading || !input.trim()}>
                    <SendIcon />
                </Button>
            </form>
        </div>
    )
}

export default AskAI