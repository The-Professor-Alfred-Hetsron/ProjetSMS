import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ContactService } from 'src/Services/contact/contact.service';
import Contact from 'src/Types/contact';
import RContact from 'src/Types/rcontat';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.css']
})


export class ContactsPageComponent {
  pageNumber:number = 0;
  currentPageNumber:number = 0;
  addContact = false
  selectedId:number = 0;
  contactForm = new FormGroup({
    name:  new FormControl(''),
    email:  new FormControl(''),
    phone:  new FormControl(''),
    comcode: new FormControl('')
  })
  contacts = [1,2,3,4,5,6,7,8,9,10]
  serverContacts:RContact[] = []
  currentDisplayedContact:object = []
  constructor(private contactService: ContactService) {}
  async createContact(){
    const {name, email, phone, comcode } = this.contactForm.value
    if(name && email && phone && comcode){
      const token = localStorage.getItem('token')
      if (token){
        const contact = await this.contactService.createContact(name, email, phone, comcode, token)
        this.serverContacts.push(contact)
      }
      else{
        alert("sorry you are not loged in")
      }
    }
    else{
      alert("sorry missing value")
    }
    this.addContact = false
  }
  async ngOnInit(){
    const token = localStorage.getItem("token");
    if (token){
      const contacts = await this.contactService.getContacts(token)
      console.log(contacts)
      if (contacts !== null){
        this.serverContacts = contacts
      }
    }
    this.pageNumber = this.serverContacts.length / 10
    this.currentPageNumber = 1
  }
}
