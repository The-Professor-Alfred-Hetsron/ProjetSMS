import Conversation from "src/Types/conversation"

const empty_conversation: Conversation = {
    id: "",
      sender: {
        id: "",
        userName: "",
        number: "",
        checked: false,
        bg: '',
      },
      receiver: {
        id: "",
        userName: "",
        number: "",
        checked: false,
        bg: '',
      },
      message: "",
      icon: '',
      bg: "",
      messages: [
        {
          content: "",
          date: "",
          hour: ""
        },
      ]
  }
export default empty_conversation