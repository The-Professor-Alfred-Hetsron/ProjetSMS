import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent {
  constructor(private _router: Router, private cookies:CookieService){}
  login(){
    this._router.navigate(['/login']);
  }
  signup(){
    this._router.navigate(['/signup']);
  }
}
