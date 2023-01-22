import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CreationDeCompteComponent } from './creation-de-compte/creation-de-compte.component';
import { RecupMotDePasseComponent } from './recup-mot-de-passe/recup-mot-de-passe.component';
import { EnregManuelDeContactsComponent } from './enreg-manuel-de-contacts/enreg-manuel-de-contacts.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { SaveContactsComponent } from './save-contacts/save-contacts.component';
import { ImportContactsComponent } from './import-contacts/import-contacts.component';
import { ContactsPageComponent } from '../Routes/contacts-page/contacts-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { SaveContactsPageComponent } from './save-contacts-page/save-contacts-page.component';
import { ImportContactsPageComponent } from './import-contacts-page/import-contacts-page.component';
import { SendSmsPageComponent } from './send-sms-page/send-sms-page.component';
import { MessagesPageComponent } from './messages-page/messages-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreationDeCompteComponent,
    RecupMotDePasseComponent,
    EnregManuelDeContactsComponent,
    CreateAccountComponent,
    ForgetPasswordComponent,
    SaveContactsComponent,
    ImportContactsComponent,
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
