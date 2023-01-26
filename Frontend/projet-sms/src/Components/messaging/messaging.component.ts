import { Component, Input } from '@angular/core';
import empty_conversation from 'src/datas/conversation';
import Conversation from 'src/Types/conversation';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent {
  
  @Input() conversation = empty_conversation
  sendicon = './assets/Images/PaperPlane.png'
  wthpicon = './assets/Images/whatsapp.png'
  search = './assets/Images/search.png'
}
