import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @Output() newContactEvent = new EventEmitter<string>();
  @Input() contact = {
    userName: '',
    number: '',
    bg: '',
    id: '',
    checked: false
  }
  changeValue(){
    if (this.contact){
      this.contact.checked = !this.contact.checked
      this.addNewContact(this.contact.id)
    }
  }
  addNewContact(value: string) {
    this.newContactEvent.emit(value);
  }
  name = new FormControl(false);
}
