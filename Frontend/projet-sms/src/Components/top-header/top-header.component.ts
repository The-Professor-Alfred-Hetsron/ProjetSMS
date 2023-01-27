import { Component } from '@angular/core';

@Component({
  selector: 'top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css']
})
export class TopHeaderComponent {
  userName = "Vicky Garba"
  userInitial = this.userName.substring(0,1).toUpperCase() + this.userName.substring(this.userName.lastIndexOf(" ")+1,this.userName.lastIndexOf(" ")+2).toUpperCase()
}
