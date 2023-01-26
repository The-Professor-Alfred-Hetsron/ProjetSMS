import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import contacts from 'src/datas/contacts';
import empty_conversation from 'src/datas/conversation';
import conversations from 'src/datas/conversations';
import Contact from 'src/Types/contact';

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.css']
})

export class MessagesPageComponent {
  
  filterItem(item: string | null){
    this.sended = this.conversations
    if(item){
      let indexes: number[] = []
      this.sended.map((conversation, index) => {
        if (conversation.receiver.userName.toLowerCase().includes(item.toLowerCase())){
          indexes.push(index)
        }
      })
      this.sended = []
      if (indexes){
        indexes.map((index) =>{
          this.sended.push(this.conversations[index])
        })
      }
    }
  }
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
  addItem(newItem: string) {
    this.contacts.map((contact) =>{
      if (contact.id == newItem){
        let isThere = this.receivers.indexOf(contact)
        if (isThere !== -1){
          contact.checked = false
          this.receivers.splice(isThere, 1)
        }
        else{
          contact.checked = true
          this.receivers.push(contact)
        }
      }
    })
    console.log(this.receivers.length)
  }
  openMessaging(newItem: string){
    this.conversations.map(convers => {
      if (convers.id === newItem){
        this.curentConversation = convers
        this.compose = false
        this.messaging = true
      }
    })
  }
  openNewMessaging(){
    this.compose=false;
    this.contactIsVisible=false;
    this.messaging=true
    if (this.receivers.length === 1){
      this.curentConversation = empty_conversation
    }
  }
  receivers: Contact[] = []
  contactIsVisible = false
  name = new FormControl('');
  compose = true;
  messaging = false
  closeicon = './assets/Images/closeicon.png'
  gradient = './assets/Images/gradient-bg.jpg'
  sendicon = './assets/Images/PaperPlane.png'
  wthpicon = './assets/Images/whatsapp.png'
  search = './assets/Images/search.png'
  logoImage = {
    image: './assets/Images/logo.png',
    alt: "logo sms app"
  }
  user = {
    image: './assets/Images/user.png',
    name: "Vicky Garba",
    alt: "vickygarba image"
  }
  curentConversation = empty_conversation
  nbMsg = 0
  conversations = conversations
  contacts:Contact[] = contacts
  sended = this.conversations
  sendedcontacts = this.contacts
}
