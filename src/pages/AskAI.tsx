import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Info, SendIcon } from "lucide-react"
import { useAuth } from "@/providers/AuthProvider"
import useModal from "@/hooks/useModal"

type Message = {
    id: string,
    content: string,
    role: "user" | "assistant",
    timestamp: Date
}

const AskAI = () => {

    const { userData } = useAuth()
    const { showModal } = useModal()

    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            content: "Merhaba, size nasıl yardımcı olabilirim?",
            role: "assistant",
            timestamp: new Date(),
        },
    ])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        const userMessage: Message = {
            id: Date.now().toString(),
            content: input,
            role: "user",
            timestamp: new Date(),
        }
        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setIsLoading(true)

        // Geçici yanıt üretme
        setTimeout(() => {
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: `"${input}" hakkında bir soru sordunuz fakat henüz cevabını bilmiyorum.`,
                role: "assistant",
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, aiMessage])
            setIsLoading(false)
        }, 1000)
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

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
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"
                                }`}
                        >
                            {message.role === "assistant" && (
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/aiavatar.png" />
                                    <AvatarFallback>StackAI</AvatarFallback>
                                </Avatar>
                            )}
                            <div
                                className={`max-w-[80%] rounded-lg px-4 py-2 ${message.role === "user"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted"
                                    }`}
                            >
                                <p>{message.content}</p>
                                <p className="text-xs opacity-70 mt-1 text-right">
                                    {message.timestamp.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>
                            {message.role === "user" && (
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={`${import.meta.env.VITE_IMAGE_BASEPATH}/${userData?.avatar}`} />
                                    <AvatarFallback>{userData?.nickname}</AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-3 justify-start">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/aiavatar.png" />
                                <AvatarFallback>StackAI</AvatarFallback>
                            </Avatar>
                            <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                                <div className="flex space-x-2">
                                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-75"></div>
                                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-150"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </ScrollArea>

            <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Sorunuzu yazın..."
                    className="flex-1"
                />
                <Button type="submit" disabled={isLoading || !input.trim()}>
                    <SendIcon />
                </Button>
            </form>
        </div>
    )
}

export default AskAI