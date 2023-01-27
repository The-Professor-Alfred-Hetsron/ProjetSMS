import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, RoutingComponent } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ContactsPageComponent } from '../Routes/contacts-page/contacts-page.component';
import { LoginPageComponent } from '../Routes/login-page/login-page.component';
import { ForgotPasswordPageComponent } from '../Routes/forgot-password-page/forgot-password-page.component';
import { HomePageComponent } from '../Routes/home-page/home-page.component';
import { HomeSectionComponent } from '../Components/home-section/home-section.component';
import { SaveContactsPageComponent } from '../Routes/save-contacts-page/save-contacts-page.component';
import { ImportContactsPageComponent } from '../Routes/import-contacts-page/import-contacts-page.component';
import { SendSmsPageComponent } from '../Routes/send-sms-page/send-sms-page.component';
import { MessagesPageComponent } from '../Routes/messages-page/messages-page.component';
import { NavbarComponent } from '../Components/navbar/navbar.component';
import { MainContainerComponent } from '../Components/main-container/main-container.component';
import { MainRightContainerComponent } from '../Components/main-right-container/main-right-container.component';
import { NavitemComponent } from '../Components/navitem/navitem.component';
import { TopHeaderComponent } from '../Components/top-header/top-header.component';
import { MainSectionComponent } from '../Components/main-section/main-section.component';
import { IndexPageComponent } from '../Routes/index-page/index-page.component';
import { SignupPageComponent } from '../Routes/signup-page/signup-page.component';
import { ContactCardComponent } from '../Components/contact-card/contact-card.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsPageComponent,
    LoginPageComponent,
    ForgotPasswordPageComponent,
    SaveContactsPageComponent,
    ImportContactsPageComponent,
    SendSmsPageComponent,
    MessagesPageComponent,
    NavbarComponent,
    MainContainerComponent,
    MainRightContainerComponent,
    NavitemComponent,
    RoutingComponent,
    TopHeaderComponent,
    MainSectionComponent,
    IndexPageComponent,
    SignupPageComponent,
    ContactCardComponent,
    HomePageComponent,
    HomeSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
