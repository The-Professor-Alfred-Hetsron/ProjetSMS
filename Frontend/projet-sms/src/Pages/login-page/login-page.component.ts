import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(private authService: AuthService, private _router: Router) {}
  
  async onSubmit(){
    const { email, password } = this.loginForm.value
    if (email && password) {
      const resp = await this.authService.getUserContactId({email, password})
      const {id, contact, token} = resp
      if (id && contact && token) {
        document.cookie = `token=${token}`;
        localStorage.setItem('token', token)
        this._router.navigate([`/messages/${contact}`])
      }
    }
    else{
      alert("fields can not be empty")
    }
  }
}
