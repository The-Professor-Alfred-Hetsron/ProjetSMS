import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private _router: Router){}
  navigate_to(path: string){
    this._router.navigate([path]);
  }
  
  isActive = false
  //<img src="{{linkImage}}" alt="{{label}}" *ngIf="!isActive">
  //(click)="toogleLinkIcon($event)"
  toogleLinkIcon(event:Event){
    this.isActive = !this.isActive
  }
}
