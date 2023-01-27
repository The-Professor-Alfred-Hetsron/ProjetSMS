import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
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
  sended = this.conversations
  sendedcontacts = this.contacts
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
  constructor(
    private authService: AuthService,
    private messagingService: MessagingService,
    private contactService: ContactService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    this._activatedRoute.params.subscribe(parameter => {
      this.id = this._activatedRoute.snapshot.params['id']
    })
    this.contacts = []
    if (this.id){
      //get the user name
      const token = localStorage.getItem('token')
      if (token){
        const resp = await this.contactService.getContact(this.id, token)
          if (resp){
            this.user.contact.userName = resp.name
            this.user.contact.number = resp.phone
            this.user.contact.email = resp.email
            this.user.contact.zipCode = resp.zipCode
            this.user.contact.id = resp.id
          }
          const userContacts = await this.authService.getUser(resp.creator)
          if (userContacts) {
            const { contacts } = userContacts
            if (contacts) {
              contacts.map(async (contact: string) => {
                const resp = await this.contactService.getContact(contact, token)
                if (resp) {
                  //console.log(resp)
                  const addContact = {
                    userName: resp.name,
                    number: resp.phone,
                    email: resp.email,
                    id: resp._id,
                    checked: false,
                    bg: "bg-blue",
                    zipCode: 237
                  }
                  this.contacts.push(addContact)
                }
              })
              this.sendedcontacts = this.contacts
            }
          }
          const res = await this.messagingService.getMessages(resp._id)
          if (res !== null && res !== undefined) {
            //console.log(res)
            const conversations: Conversation[] = []
            const intermconv: SMsg[] = [] 
            res.map((message: Msg) => {
                console.log(message)
                message.receivers.map((receiver: string) => {
                  const newMessage: SMsg = {
                    _id: receiver,
                    content: message.content,
                    sender: message.sender,
                    receiver: receiver,
                    sendedAt: message.sendedAt
                  }
                  intermconv.push(newMessage)
                })
            })
            if(intermconv){
              const resp = await this.contactService.getContact(intermconv[0].receiver, token)
              const addContact = {
                userName: resp.name,
                number: resp.phone,
                email: resp.email,
                id: resp._id,
                checked: false,
                bg: "bg-blue",
                zipCode: 237
              }
              conversations.push({
                sender: this.user.contact,
                receiver: addContact,
                icon: './assets/Images/whatsapp.png',
                bg: "bg-blue",
                id: intermconv[0]._id,
                messages: [{
                  content: intermconv[0].content,
                  date: intermconv[0].sendedAt,
                  hour: intermconv[0].sendedAt,
                  receivers: null
                }]
              })
              let i: number = 0
              intermconv.map( async (message: SMsg) => {
                conversations.map((conversation: Conversation) => {
                  if (message.receiver === conversation.receiver.id){
                    conversation.messages.push({
                      content: message.content,
                      date: message.sendedAt,
                      hour: message.sendedAt,
                      receivers: null
                    })
                    i = 1
                  }
                })
                if (i === 1){
                  i = 0
                  const resp = await this.contactService.getContact(message.receiver, token)
                  const addContact = {
                    userName: resp.name,
                    number: resp.phone,
                    email: resp.email,
                    id: resp._id,
                    checked: false,
                    bg: "bg-blue",
                    zipCode: 237
                  }
                  conversations.push({
                    sender: this.user.contact,
                    receiver: addContact,
                    icon: './assets/Images/whatsapp.png',
                    bg: "bg-blue",
                    id: message._id,
                    messages: [{
                      content: message.content,
                      date: message.sendedAt,
                      hour: message.sendedAt,
                      receivers: null
                    }]
                  })
                }
              })
              this.conversations = conversations
              this.sended = this.conversations
              this.nbMsg = this.conversations.length
              console.log(this.conversations)
            }
          }
        }
      }
      else{
        this._router.navigate([`/404`])
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
  
  
  
}
