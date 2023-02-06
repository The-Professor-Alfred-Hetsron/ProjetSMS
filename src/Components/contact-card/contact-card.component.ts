import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css']
})

export class ContactCardComponent {
    @Input() id: number = 0;
    @Input() contactName: string = "";
    @Input() contactTel: string = "";
    @Input() contactEmail: string = "";

    @Output() idSendEvent = new EventEmitter<number>();
    @Output() onSelectEvent = new EventEmitter<boolean>();
    sendId(event:Event) {
      this.idSendEvent.emit(this.id);
      this.onSelectEvent.emit(true);
    }
    
    contactInitials: string = ""
    ngOnInit(){
      this.contactInitials = this.contactName.substring(0,1).toUpperCase() + this.contactName.substring(this.contactName.lastIndexOf(" ")+1,this.contactName.lastIndexOf(" ")+2).toUpperCase()
    }
}
