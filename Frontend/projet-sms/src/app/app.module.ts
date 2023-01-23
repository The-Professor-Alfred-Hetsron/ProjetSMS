import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ContactsPageComponent } from 'src/Routes/contacts-page/contacts-page.component';
import { ForgotPasswordPageComponent } from 'src/Routes/forgot-password-page/forgot-password-page.component';
import { LoginPageComponent } from 'src/Routes/login-page/login-page.component';
import { MessagesPageComponent } from 'src/Routes/messages-page/messages-page.component';
import { SaveContactsPageComponent } from 'src/Routes/save-contacts-page/save-contacts-page.component';
import { SendSmsPageComponent } from 'src/Routes/send-sms-page/send-sms-page.component';
import { SigninPageComponent } from 'src/Routes/signin-page/signin-page.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';


@NgModule({
  declarations: [
    AppComponent,
    MessagesPageComponent,
    LoginPageComponent,
    ForgotPasswordPageComponent,
    SaveContactsPageComponent,
    SendSmsPageComponent,
    SigninPageComponent,
    ContactsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
