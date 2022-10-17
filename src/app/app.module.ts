import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import { EventListComponent } from './event-list/event-list.component';
import { EventComponent } from './event/event.component';
import { EventInputComponent } from './event-input/event-input.component';
import {HttpClientModule} from "@angular/common/http";
import { NewUserComponent } from './new-user/new-user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserInputComponent } from './user-input/user-input.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EventListComponent,
    EventComponent,
    EventInputComponent,
    NewUserComponent,
    UserInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
