import Conversation from "src/Types/conversation"

const empty_conversation: Conversation = {
      id: "",
      sender: {
        id: "",
        userName: "",
        number: "",
        checked: false,
        bg: '',
        email: "",
        zipCode: 0,

      },
      receiver: {
        id: "",
        userName: "",
        number: "",
        checked: false,
        bg: '',
        email: "",
        zipCode: 0,
      },
      icon: '',
      bg: "",
      messages: [
        {
          content: "",
          date: "",
          hour: "",
          receivers: []
        },
      ]
  }
export default empty_conversation