import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsPageComponent } from '../Routes/contacts-page/contacts-page.component';
import { LoginPageComponent } from '../Routes/login-page/login-page.component';
import { SigninPageComponent } from '../Routes/signin-page/signin-page.component';
import { ForgotPasswordPageComponent } from '../Routes/forgot-password-page/forgot-password-page.component';
import { SaveContactsPageComponent } from '../Routes/save-contacts-page/save-contacts-page.component';
import { ImportContactsPageComponent } from '../Routes/import-contacts-page/import-contacts-page.component';
import { SendSmsPageComponent } from '../Routes/send-sms-page/send-sms-page.component';
import { MessagesPageComponent } from '../Routes/messages-page/messages-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsPageComponent,
    LoginPageComponent,
    SigninPageComponent,
    ForgotPasswordPageComponent,
    SaveContactsPageComponent,
    ImportContactsPageComponent,
    SendSmsPageComponent,
    MessagesPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
