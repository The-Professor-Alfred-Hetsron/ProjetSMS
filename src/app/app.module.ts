import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactsPageComponent } from '../Pages/contacts-page/contacts-page.component';
import { LoginPageComponent } from '../Pages/login-page/login-page.component';
import { SignupPageComponent } from '../Pages/signup-page/signup-page.component';
import { ForgotPasswordPageComponent } from '../Pages/forgot-password-page/forgot-password-page.component';
import { SaveContactsPageComponent } from '../Pages/save-contacts-page/save-contacts-page.component';
import { ImportContactsPageComponent } from '../Pages/import-contacts-page/import-contacts-page.component';
import { SendSmsPageComponent } from '../Pages/send-sms-page/send-sms-page.component';
import { MessagesPageComponent } from '../Pages/messages-page/messages-page.component';
import { HomePageComponent } from '../Pages/home-page/home-page.component';
import { LayoutPageComponent } from '../Components/layout-page/layout-page.component';
import { NavbarComponent } from '../Components/navbar/navbar.component';
import { NavitemComponent } from 'src/Components/navitem/navitem.component';
import { ConversationComponent } from '../Components/conversation/conversation.component';
import { ContactComponent } from '../Components/contact/contact.component';
import { MessagingComponent } from '../Components/messaging/messaging.component';
import { ContactCardComponent } from 'src/Components/contact-card/contact-card.component';
import { TopHeaderComponent } from 'src/Components/top-header/top-header.component';
import { NgxsModule } from '@ngxs/store';
import { CookieService } from 'ngx-cookie-service';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

@NgModule({
  declarations: [
    AppComponent,
    ContactsPageComponent,
    LoginPageComponent,
    SignupPageComponent,
    ForgotPasswordPageComponent,
    SaveContactsPageComponent,
    ImportContactsPageComponent,
    SendSmsPageComponent,
    MessagesPageComponent,
    HomePageComponent,
    LayoutPageComponent,
    NavbarComponent,
    NavitemComponent,
    ConversationComponent,
    ContactComponent,
    MessagingComponent,
    ContactCardComponent,
    TopHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxsModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
