import { Component, Input } from '@angular/core';

@Component({
  selector: 'navitem',
  templateUrl: './navitem.component.html',
  styleUrls: ['./navitem.component.css']
})
export class NavitemComponent {
  @Input() activeImage = "";
  @Input() linkImage = "";
  @Input() path = "";
  @Input() label = "";
  
  isActive = false
  //<img src="{{linkImage}}" alt="{{label}}" *ngIf="!isActive">
  //(click)="toogleLinkIcon($event)"
  toogleLinkIcon(event:Event){
    this.isActive = !this.isActive
  }
}
