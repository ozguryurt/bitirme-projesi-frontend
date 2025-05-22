export default interface MessageAIType {
    id: string,
    content: string,
    role: "user" | "assistant",
    timestamp: Date,
    status: "loading" | "loaded" | "error"
}