import { StarsIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Link } from "react-router"
import { useEffect, useState } from "react";

const AskAIButton = ({ mouseEffect }: { mouseEffect: boolean }) => {

    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            const x = ((e.clientX / innerWidth) - 0.5) * 20;
            const y = ((e.clientY / innerHeight) - 0.5) * 20;
            setOffset({ x, y });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <>
            {
                mouseEffect === true ?
                    <div className="relative inline-block group">
                        <StarsIcon
                            className="absolute w-5 h-5 text-yellow-400 
                            drop-shadow-[0_0_8px_rgba(255,235,59,0.7)] 
                            animate-[pulse_2s_infinite]"
                            style={{
                                top: `-1rem`,
                                right: `-1rem`,
                                transform: `translate(${-offset.x}px, ${-offset.y}px)`,
                            }}
                        />

                        <Button asChild className="relative overflow-hidden">
                            <Link
                                to={`/ask-ai`}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg"
                            >
                                <StarsIcon
                                    className="w-5 h-5 text-purple-300 
                                    drop-shadow-[0_0_6px_rgba(253,224,71,0.8)]
                                    animate-[ping_1.5s_infinite]"
                                />
                                <span className="font-medium text-white">StackAI</span>
                                <StarsIcon
                                    className="w-5 h-5 text-cyan-300 
                                    drop-shadow-[0_0_6px_rgba(103,232,249,0.8)]
                                    animate-[ping_1.5s_infinite_0.5s]"
                                />
                            </Link>
                        </Button>

                        <StarsIcon
                            className="absolute w-5 h-5 text-pink-400 
                            drop-shadow-[0_0_10px_rgba(236,72,153,0.6)]
                            animate-[pulse_3s_infinite_1s]"
                            style={{
                                bottom: `-1rem`,
                                left: `-1rem`,
                                transform: `translate(${offset.x}px, ${offset.y}px)`,
                            }}
                        />
                    </div>
                    :
                    <div className="relative inline-block group">
                        <StarsIcon className="absolute -top-4 -right-4 w-5 h-5 text-yellow-400 
                                    drop-shadow-[0_0_8px_rgba(255,235,59,0.7)] 
                                    animate-[pulse_2s_infinite]" />

                        <Button asChild className="relative overflow-hidden">
                            <Link to={`/ask-ai`} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                                <StarsIcon className="w-5 h-5 text-purple-300 
                                            drop-shadow-[0_0_6px_rgba(253,224,71,0.8)]
                                            animate-[ping_1.5s_infinite]" />
                                <span className="font-medium text-white">StackAI</span>
                                <StarsIcon className="w-5 h-5 text-cyan-300 
                                            drop-shadow-[0_0_6px_rgba(103,232,249,0.8)]
                                            animate-[ping_1.5s_infinite_0.5s]" />
                            </Link>
                        </Button>

                        <StarsIcon className="absolute -bottom-4 -left-4 w-5 h-5 text-pink-400 
                                    drop-shadow-[0_0_10px_rgba(236,72,153,0.6)]
                                    animate-[pulse_3s_infinite_1s]" />
                    </div>
            }
        </>
    )
}

export default AskAIButton