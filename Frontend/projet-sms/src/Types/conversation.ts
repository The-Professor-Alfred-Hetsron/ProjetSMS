import Contact from "./contact"
import Message from "./message"

interface Conversation {
    sender: Contact,
    receiver: Contact,
    icon: string,
    bg: string,
    id: string
    messages: Message []
}

export default Conversation