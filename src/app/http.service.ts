import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {INewUserForm} from "./interfaces/INewUserForm";
import {Observable} from "rxjs";
import {IEventForm} from "./interfaces/IEventForm";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {

  }
//get the user information on the web page(service setup to talk to the server)
  getUsers(){
    return this.httpClient.get('http://localhost:3000/users');
  }

  createUser(newUser:any){
    return this.httpClient.post(' http://localhost:3000/users', newUser) as Observable<INewUserForm>;
  }

  deleteUser(id:number){
    return this.httpClient.delete(' http://localhost:3000/users/'+id);
  }

  findUserByEmail(email: string){
    return this.httpClient.get(' http://localhost:3000/users?email=' + email) as Observable<INewUserForm>;
  }
  getEvents(){
    return this.httpClient.get('  http://localhost:3000/Events');
  }

  createNewEvent(newEvent:any){
    return this.httpClient.post(' http://localhost:3000/Events',newEvent) as Observable<IEventForm>;
  }




}
