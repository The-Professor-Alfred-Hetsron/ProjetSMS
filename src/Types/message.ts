interface Message {
    content: string,
    date: string,
    hour: string,
    receivers: string [] | null
}

export default Message