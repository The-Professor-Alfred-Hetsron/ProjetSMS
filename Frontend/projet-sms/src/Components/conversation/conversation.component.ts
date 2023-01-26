import { Component, EventEmitter, Input, Output } from '@angular/core';
import empty_conversation from 'src/datas/conversation';
import Conversation from 'src/Types/conversation';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})



export class ConversationComponent {
  @Output() messagingEvent = new EventEmitter<string>();
  @Input() conversation: Conversation = empty_conversation
  openMessaging(value: string) {
    this.messagingEvent.emit(value);
  }
  
}
