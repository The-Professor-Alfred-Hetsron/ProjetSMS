import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import empty_conversation from 'src/datas/conversation';
import { ContactService } from 'src/Services/contact/contact.service';
import { MessagingService } from 'src/Services/messaging/messaging.service';
import Conversation from 'src/Types/conversation';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent {
  @Input() conversation = empty_conversation
  newmessage = new FormControl('')
  sendicon = './assets/Images/PaperPlane.png'
  wthpicon = './assets/Images/whatsapp.png'
  search = './assets/Images/search.png'
  constructor(
    private messagingService: MessagingService,
  ) { }

  async sendNewMessage(){
    if (this.newmessage.value !== '') {
      const receivers = [this.conversation.receiver.number]
      const token = localStorage.getItem('token')
      const message = this.newmessage.value
      if (message && receivers && token){
        const newmessage = await this.messagingService.sendMessage(message, receivers, token)
        const sendedAt = `${newmessage.sendedAt}`
        const nwedate = sendedAt.split('T')[0]
        const newHour = sendedAt.split('T')[1].split('.')[0]
        this.conversation.messages.push({
          content: newmessage.content,
          date: nwedate,
          hour: newHour,
          receivers: newmessage.receivers
        })
      }
    }
  }
}
