interface Msg {
    _id: string,
    content: string,
    sender: string,
    receivers: string[],
    sendedAt: string
}

export default Msg