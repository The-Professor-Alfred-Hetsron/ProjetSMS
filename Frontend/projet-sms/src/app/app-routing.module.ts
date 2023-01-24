import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsPageComponent } from '../Routes/contacts-page/contacts-page.component';
import { MessagesPageComponent } from '../Routes/messages-page/messages-page.component';
import { IndexPageComponent } from '../Routes/index-page/index-page.component';

const routes: Routes = [
  {path: "contacts", component: ContactsPageComponent},
  {path: "messages", component: MessagesPageComponent},
  {path: "", component: IndexPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponent = [ContactsPageComponent,MessagesPageComponent,IndexPageComponent];
