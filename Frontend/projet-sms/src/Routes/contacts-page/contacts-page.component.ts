import { Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.css']
})


export class ContactsPageComponent {

  selectedId:number = 0;
  isContactSelected:boolean = false;
  isAddcontact:boolean = false;
  toogleAddcontactCard(event:Event):void{
    this.isAddcontact = !this.isAddcontact
  }
  getSelectedContactId(id:number):void{
    this.selectedId = id
    //console.log(`id: sent ${id} and received ${this.selectedId}`)
  }
  getContactSelectedState(state:boolean):void{
    this.isContactSelected = state
    //console.log(`state: sent ${state} and received ${this.isContactSelected}`)
  }

  serverContacts = [
    {
      name:"Alfred Yepnjio",
      tel:"+237657999999",
      email:"alfred@gmail.com"
    },
    {
      name:"Vicky Garba",
      tel:"+237657999999",
      email:"vicky@gmail.com"
    },
    {
      name:"Amanda Celine",
      tel:"+237657999999",
      email:"amanda@gmail.com"
    },
    {
      name:"Anzie Severin",
      tel:"+237657999999",
      email:"anzie@gmail.com"
    },
    {
      name:"Afane Joyce",
      tel:"+237657999999",
      email:"joyce@gmail.com"
    },
    {
      name:"Amouou Georges",
      tel:"+237657999999",
      email:"george@gmail.com"
    },
    {
      name:"Alfred Yepnjio",
      tel:"+237657999999",
      email:"alfred@gmail.com"
    },
    {
      name:"Vicky Garba",
      tel:"+237657999999",
      email:"vicky@gmail.com"
    },
    {
      name:"Amanda Celine",
      tel:"+237657999999",
      email:"amanda@gmail.com"
    },
    {
      name:"Anzie Severin",
      tel:"+237657999999",
      email:"anzie@gmail.com"
    },
    {
      name:"Afane Joyce",
      tel:"+237657999999",
      email:"joyce@gmail.com"
    },
    {
      name:"Amouou Georges",
      tel:"+237657999999",
      email:"george@gmail.com"
    }
  ]

  contactNumber:number = this.serverContacts.length
  totalPages:number = Math.round(this.contactNumber/ 12);
  currentPageId:number = 1;
  isOnePage:boolean = this.totalPages === 1

  searchInput = new FormControl("")
  contactSearchInput:string = ""
  currentDisplayedContact = this.serverContacts
  filterContacts(input: string | null):void{
    this.currentDisplayedContact = this.serverContacts
    if(input){
        let indexes: number[] = []
        this.currentDisplayedContact.map((contact, index)=>{
          if(contact.name.toLowerCase().includes(input.toLowerCase())
            || contact.tel.toLowerCase().includes(input.toLowerCase())
            || contact.email.toLowerCase().includes(input.toLowerCase())){
                indexes.push(index)
          }
        })
        this.currentDisplayedContact = []
        if(indexes){
          indexes.map((index) =>{
            this.currentDisplayedContact.push(this.serverContacts[index])
            this.contactNumber = this.currentDisplayedContact.length
          })
        }
    }
  }
}
