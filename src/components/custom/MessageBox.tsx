import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDate } from "@/lib/formatDate"
import MessageAIType from "@/types/MessageAIType"
import UserType from "@/types/UserType"
import Typewriter from 'typewriter-effect';

const MessageBox = ({ message, userData }: { message?: MessageAIType, userData?: UserType }) => {
    return (
        <>
            {
                message &&
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
                            {
                                message.status === "error" ?
                                    <>{message.content}</>
                                    :
                                    message.status === "loading" ?
                                        <div className="flex space-x-2">
                                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-75"></div>
                                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-150"></div>
                                        </div>
                                        :
                                        <>
                                            {
                                                message.role === "user" &&
                                                <>{message.content}</>
                                            }
                                            {
                                                message.role === "assistant" &&
                                                <Typewriter
                                                    options={{
                                                        cursor: '',
                                                        delay: 20,
                                                    }}
                                                    onInit={(typewriter: any) => {
                                                        typewriter
                                                            .typeString(message.content)
                                                            .start();
                                                    }}
                                                />
                                            }
                                        </>
                            }
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
            }
        </>
    )
}

export default MessageBox