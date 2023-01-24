import { Component } from '@angular/core';

@Component({
  selector: 'top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css']
})
export class TopHeaderComponent {
  userName = "Vicky Garba"
  userInitial1 = this.userName.substring(0,1).toUpperCase()
  userInitial2 = this.userName.substring(this.userName.indexOf(" ")+1,this.userName.indexOf(" ")+2).toUpperCase()
}
