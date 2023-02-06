import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/Services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private authService: AuthService, private _router: Router, private cookies: CookieService) {}
  navigate(route:string){
    this._router.navigate([route])
  }
  goMain(){
    this._router.navigate(['/'])
  }
  setCookie(cname:string, cvalue:string, exdays:number) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  async onSubmit(){
    const { email, password } = this.loginForm.value
    if (email && password) {
      const resp = await this.authService.getUserContactId({email, password})
      const {id, contact, token} = resp
      this.cookies.set('token', token)
      this.cookies.set('user_id', id)
      this.cookies.set('user_contact_id', contact)
      if (id && contact && token) {
        this.setCookie("token", token, 1)
        this.cookies.set('token', token)
        this._router.navigate([`/messages`])
      }
    }
    else{
      alert("fields can not be empty")
    }
  }
}
