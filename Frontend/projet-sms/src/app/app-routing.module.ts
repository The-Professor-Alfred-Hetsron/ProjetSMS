import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsPageComponent } from '../Routes/contacts-page/contacts-page.component';
import { MessagesPageComponent } from '../Routes/messages-page/messages-page.component';
import { IndexPageComponent } from '../Routes/index-page/index-page.component';
import { LoginPageComponent } from '../Routes/login-page/login-page.component';
import { SignupPageComponent } from '../Routes/signup-page/signup-page.component';
import { ForgotPasswordPageComponent } from '../Routes/forgot-password-page/forgot-password-page.component';
import { HomePageComponent } from '../Routes/home-page/home-page.component';

const routes: Routes = [
  {path: "", component: IndexPageComponent},
  {path: "login", component: LoginPageComponent},
  {path: "signup", component: SignupPageComponent},
  {path: "forgotPassword", component: ForgotPasswordPageComponent},
  {path:"home", component:HomePageComponent},
  {path: "contacts", component: ContactsPageComponent},
  {path: "messages", component: MessagesPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponent = [LoginPageComponent,IndexPageComponent,SignupPageComponent,ForgotPasswordPageComponent,ContactsPageComponent,MessagesPageComponent];
