import { Component } from '@angular/core';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  allNavLinks = [
    {
      activeImage:"./assets/Images/HomeButtonActive.png",
      linkImage:"./assets/Images/HomeButtonLink.png",
      path:"",
      label:"Home"
    },
    {
      activeImage:"./assets/Images/ContactsButtonActive.png",
      linkImage:"./assets/Images/ContactsButtonLink.png",
      path:"/contacts",
      label:"Contacts"
    },
    {
      activeImage:"./assets/Images/MessagesButtonActive.png",
      linkImage:"./assets/Images/MessagesButtonLink.png",
      path:"/messages/",
      label:"Messages"
    }
  ]

  accountLink = {
    activeImage: "./assets/Images/UserAccountButtonActive.png",
    linkImage: "./assets/Images/UserAccountButtonLink.png",
    path: "/account",
    label: "Accounts"
  }

  logoutLink = {
    activeImage: "./assets/Images/LogoutButtonActive.png",
    linkImage: "./assets/Images/LogoutButtonLink.png",
    path: "/logout",
    label: "Logout"
  }
}
