import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import contacts from 'src/datas/contacts';
import empty_conversation from 'src/datas/conversation';
import conversations from 'src/datas/conversations';
import empty_user from 'src/datas/user';
import { AuthService } from 'src/Services/auth/auth.service';
import { ContactService } from 'src/Services/contact/contact.service';
import { MessagingService } from 'src/Services/messaging/messaging.service';
import Contact from 'src/Types/contact';
import Conversation from 'src/Types/conversation';
import Message from 'src/Types/message';
import Msg from 'src/Types/msg';
import RContact from 'src/Types/rcontat';
import SMsg from 'src/Types/smsg';

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.css']
})

export class MessagesPageComponent {
  id: string = '';
  user = empty_user
  curentConversation = empty_conversation
  nbMsg:number = 0
  conversations:Conversation[] = []
  contacts:Contact[] = []
  receivers: Contact[] = []
  sendedcontacts:Contact[] = []
  sended = this.conversations
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
  constructor(
    private authService: AuthService,
    private messagingService: MessagingService,
    private contactService: ContactService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private cookie: CookieService
  ) { }

  async ngOnInit() {
    this._activatedRoute.params.subscribe(parameter => {
      this.id = this.cookie.get('user_contact_id')
    })
    this.contacts = []
    if (this.id){
      const token = this.cookie.get('token')
      if (token !== '' && token !== null){
        //check for the lloged user contact
        const resp = await this.contactService.getContact(this.id, token)
        if (resp){
          this.user.contact.userName = resp.name
          this.user.contact.number = resp.phone
          this.user.contact.email = resp.email
          this.user.contact.zipCode = resp.zipCode
          this.user.contact.id = resp._id
        }

        //recuperation de tous les messages
        const userMessages = await this.messagingService.getMessages(this.user.contact.id)
        const conversationsNumbers:string[] = []
        //parcours des messages
        for(let index = 0; index < userMessages.length; index++) {
          const messageReceivers = userMessages[index].receivers //destinataires des messages
          if (messageReceivers.length > 0) {
            //pour chaque recepteur des messages
            for (let uid = 0; uid < messageReceivers.length; uid++) {
              //si l'utilisateur n'est pas encore dans le tableau 
              if (conversationsNumbers.indexOf(messageReceivers[uid]) === -1){
                conversationsNumbers.push(messageReceivers[uid])
              }
            }
          }
        }

        console.log(conversationsNumbers)
        
        //et creation d'un contact avec une liste de messages vide
        for(let index = 0; index < conversationsNumbers.length; index++){
          const conversation = empty_conversation
          console.log(conversationsNumbers[index])
          const contact = await this.contactService.getContact(conversationsNumbers[index], token)
          this.conversations.push({
              id: conversationsNumbers[index],
              sender: {
                ...this.user.contact
              },
              receiver: {
                userName: contact.name,
                email: contact.email,
                number: contact.phone,
                zipCode: contact.zipCode,
                id: conversationsNumbers[index],
                bg: 'bg-blue',
                checked: false
              },
              bg: 'bg-blue',
              icon: this.wthpicon,
              messages: []
          })
        }
        //recherche des messages de chaque utilisateur parmis tous les messages
        for(let index = 0; index < userMessages.length; index++) {
          const messageReceivers = userMessages[index].receivers //destinataires des messages
          if (messageReceivers.length > 0) {
            //pour chaque recepteur des messages
            for (let uid = 0; uid < messageReceivers.length; uid++) {
              //pour chaque recpeteur unique
              for (let uid2 = 0; uid2 < this.conversations.length; uid2++) {
                if (this.conversations[uid2].receiver.id.toString() === messageReceivers[uid]){
                  console.log(userMessages[index])
                  this.conversations[uid2].messages.push({
                    content: userMessages[index].content,
                    date: userMessages[index].sendedAt,
                    hour: userMessages[index].sendedAt,
                    receivers: null
                  })
                }
              }
            }
          }
        }
      }
      else{
        this._router.navigate([`/`])
      }
    }
    else{
      this._router.navigate([`/`])
    }
  }

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
      this.curentConversation.sender = this.user.contact
      this.curentConversation.receiver = this.receivers[0]
    }
  }
  
  async chooseContacts(){
    this.contactIsVisible=true
    const token = localStorage.getItem('token')
    if (token){
      const contacts = await this.contactService.getContacts(token)
      this.contacts = []
      contacts.map((contact:RContact) => {
        this.contacts.push({
          userName: contact.name,
          email:contact.email, 
          id:contact._id,
          zipCode: contact.zipCode,
          checked: false,
          number: contact.phone,
          bg: 'bg-blue'
        })
      })
      this.sendedcontacts = this.contacts
    }
  }
  
}
