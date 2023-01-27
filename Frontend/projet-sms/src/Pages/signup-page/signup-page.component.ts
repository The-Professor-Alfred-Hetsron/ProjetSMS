import { Component } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(private authService: AuthService, private _router: Router) {}
  async onSubmit(){
    const { name, email, phone, password } = this.singUpForm.value
    if (name && email && password && phone){
      const resp = await this.authService.createUser(name, email, `${phone}`, `${password}`)
      if(resp){
        localStorage.setItem('token', resp.token)
        this._router.navigate([`/messages/${resp.user.contact}?tk=${resp.token}`]);
      }
    }
  }
}
