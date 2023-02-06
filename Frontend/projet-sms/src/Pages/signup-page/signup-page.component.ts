import { Component } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/Services/auth/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {
  singUpForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private authService: AuthService, private _router: Router, private cookies: CookieService) {}
  async onSubmit(){
    const { name, email, phone, password } = this.singUpForm.value
    if (name && email && password && phone){
      const resp = await this.authService.createUser(name, email, `${password}`, `${phone}`)
      if(resp){
        const token = resp.token
        this.cookies.set('token', token)
        this.cookies.set('user_id', resp.user._id)
        this.cookies.set('user_contact_id', resp.user.contact)
        const restok = localStorage.getItem('token')
        alert(restok)
        this._router.navigate([`/messages`]);
      }
    }
  }
}
