import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ContactService } from 'src/Services/contact/contact.service';
import Contact from 'src/Types/contact';
import RContact from 'src/Types/rcontat';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.css', './contats-page-add.component.css', './contacts-page-add-2.components.css']
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
  })
  serverContacts:RContact[] = []
  currentDisplayedContact:object[] = []
  newContactInitials:string = ""
  newContactName =  new FormControl("")
  userContact:Contact = {
    id: '',
    bg: '',
    checked: false,
    email: '',
    userName: '',
    zipCode: 237,
    number: ''
  }
  constructor(private contactService: ContactService) {}
  addContactName(data:string | null):void{
    if(data){
      this.newContactInitials = data.split(" ").length < 2 ? data.split(" ")[0][0].toUpperCase() : data.substring(0,1).toUpperCase() + data.substring(data.lastIndexOf(" ")+1,data.lastIndexOf(" ")+2).toUpperCase()
    }
  }
  async createContact(){
    this.addContact = !this.addContact
    const {email, phone} = this.contactForm.value
    const name = this.newContactName.value
    if(name && email && phone){
      const token = localStorage.getItem('token')
      if (token){
        const contact = await this.contactService.createContact(name, email, phone, '237', token)
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
  toogleAddcontactCard(event:Event):void{
    this.addContact = !this.addContact
  }
  onAddContact(data:any):void{
    this.addContact = !this.addContact
    data.newName = this.newContactName.value
    console.log(data)
    this.currentDisplayedContact.push({name:data.newName,tel:data.newPhone, email:data.newEmail})
  }
  async ngOnInit(){
    const token = localStorage.getItem('token')
    if (token){
      const contacts = await this.contactService.getContacts(token)
      if (contacts !== null){
        this.serverContacts = contacts
      }
      const contact = await this.contactService.getUserContact(token)
      if (contact !== null){
        this.userContact.email = contact.email
        this.userContact.number = contact.phone
        this.userContact.userName = contact.name
        this.userContact.id = contact._id
      }
    }
    this.pageNumber = this.serverContacts.length / 10
    this.currentPageNumber = 1
  }
}
