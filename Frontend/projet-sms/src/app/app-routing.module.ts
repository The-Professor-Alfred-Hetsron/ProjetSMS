import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsPageComponent } from 'src/Pages/contacts-page/contacts-page.component';
import { ForgotPasswordPageComponent } from 'src/Pages/forgot-password-page/forgot-password-page.component';
import { ImportContactsPageComponent } from 'src/Pages/import-contacts-page/import-contacts-page.component';
import { LoginPageComponent } from 'src/Pages/login-page/login-page.component';
import { MessagesPageComponent } from 'src/Pages/messages-page/messages-page.component';
import { SaveContactsPageComponent } from 'src/Pages/save-contacts-page/save-contacts-page.component';
import { SendSmsPageComponent } from 'src/Pages/send-sms-page/send-sms-page.component';
import { SignupPageComponent } from 'src/Pages/signup-page/signup-page.component';
import { IndexPageComponent } from 'src/Pages/index-page/index-page.component';

const routes: Routes = [
  {
    path: '',
    component: IndexPageComponent,
  },
  {
    path: 'contacts',
    component: ContactsPageComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordPageComponent
  },
  {
    path: 'import-contact',
    component: ImportContactsPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'messages',
    component: MessagesPageComponent
  },
  {
    path: 'save-contact',
    component: SaveContactsPageComponent
  },
  {
    path: 'send-message',
    component: SendSmsPageComponent
  },
  {
    path: 'signup',
    component: SignupPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
