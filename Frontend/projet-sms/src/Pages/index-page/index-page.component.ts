import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent {
  constructor(private _router: Router){}
  login(){
    localStorage.setItem('token', '')
    this._router.navigate(['/login']);
  }
  signup(){
    localStorage.setItem('token', '')
    this._router.navigate(['/signup']);
  }
}
