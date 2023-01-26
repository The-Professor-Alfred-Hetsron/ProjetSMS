import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import contacts from 'src/datas/contacts';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.css']
})
export class ContactsPageComponent {
  filterContact(item: string | null){
    this.sendedcontacts = this.contacts
    if(item){
      let indexes: number[] = []
      this.sendedcontacts.map((contact, index) => {
        if (contact.userName.toLowerCase().includes(item.toLowerCase())){
          indexes.push(index)
        }
      })
      this.sendedcontacts = []
      if (indexes){
        indexes.map((index) =>{
          this.sendedcontacts.push(this.contacts[index])
        })
      }
    }
  }
  addItem(value: string){
    return null
  }
  contacts = contacts
  sendedcontacts = this.contacts
  name = new FormControl('');
}
