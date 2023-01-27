import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.css']
})

export class ForgotPasswordPageComponent {
  submitForgotPasswd = false;
  emailid:any;
  forgetPasswdForm = new FormGroup({
    emailid: new FormControl(""),
    });

  onSubmitForgotPasswd(data:any) {
    this.emailid = data.emailid;
    console.log(`email: ${data.emailid}`)
    if(this.emailid !== "") this.submitForgotPasswd = !this.submitForgotPasswd
  }
}
