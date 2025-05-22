import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Info, SendIcon } from "lucide-react"
import { useAuth } from "@/providers/AuthProvider"
import useModal from "@/hooks/useModal"
import useQuestion from "@/hooks/useQuestion"
import MessageBox from "@/components/custom/MessageBox"
import MessageAIType from "@/types/MessageAIType"

const AskAI = () => {

    const { userData } = useAuth()
    const { showModal } = useModal()
    const { askAI, askAIIsLoading } = useQuestion()

    const [messages, setMessages] = useState<MessageAIType[]>([])
    const [input, setInput] = useState("")
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        const userMessage = {
            id: Date.now().toString(), // Dinamik ID
            content: input,
            role: "user" as const,
            timestamp: new Date(),
            status: "loaded" as const
        }

        const loadingMessage = {
            id: (Date.now() + 1).toString(), // Benzersiz ID
            content: "",
            role: "assistant" as const,
            timestamp: new Date(),
            status: "loading" as const
        }

        // Input'u temizle
        setInput("")

        // Kullanıcı mesajını ekle
        setMessages((prev) => [...prev, userMessage])

        // Loading mesajını ekle
        setMessages((prev) => [...prev, loadingMessage])

        try {
            const res = await askAI({ question: userMessage.content })

            // Loading mesajını kaldır ve gerçek cevabı ekle
            setMessages((prev) => {
                const withoutLoading = prev.filter(msg => msg.id !== loadingMessage.id)
                return [...withoutLoading, res.assistant]
            })
        } catch (err) {
            // Loading mesajını kaldır ve hata mesajını ekle
            setMessages((prev) => {
                const withoutLoading = prev.filter(msg => msg.id !== loadingMessage.id)
                return [...withoutLoading, {
                    id: Date.now().toString(),
                    content: "Üzgünüm, şu anda size cevap veremiyorum.",
                    role: "assistant" as const,
                    timestamp: new Date(),
                    status: "error" as const
                }]
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
                    {
                        messages.map((message) => (
                            <>
                                <MessageBox key={message.id} message={message} userData={userData!} />
                            </>
                        ))
                    }
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