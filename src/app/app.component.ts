import { Component } from '@angular/core';
import {ILogin} from "./interfaces/ILogin";
import {HttpService} from "./http.service";
import {IEventForm} from "./interfaces/IEventForm";
import { v4 as uuidv4 } from 'uuid';
import {DataService} from "./data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //users: any ;
  //title = 'CalendarEvents';

  isLoggedIn: boolean = true;
  //isCreating: boolean = false;
  //set a new variable selectedEvent
  selectedEvent: IEventForm | null = null;

  accountList: ILogin[]=[
      {email:'test@test', password:'hello123'}
]

  constructor(private dataService: DataService){
    //access the eventList with in my component
    this.dataService.$selectedEvent.subscribe(
      (selectedEvent) => {
        this.selectedEvent = selectedEvent;
    }
    )
    //grab the value from the dataService and stores locally

  }


   //reaction to event
  onLogin(logincreds:ILogin){
    console.log('login!')
    console.log('logincreds')
   const foundAccount=this.accountList.find((account)=>{
     return account.email === logincreds.email &&
     account.password === logincreds.password
   })
    console.log(foundAccount);

    if(foundAccount === undefined){
      console.log('invalid login')
      return;
    }
      this.isLoggedIn = true;
    }



  // constructor(private httpService: HttpService){
  //   this.httpService.getUsers().subscribe({
  //     next:(data) => {
  //       console.log (data);
  //       this.users = data;
  //     },
  //     error:(err) => {
  //       console.log(err);
  //     }
  //     })
  //   console.log(this.users)
  // }


  }





