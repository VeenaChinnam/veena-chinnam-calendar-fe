import { Component } from '@angular/core';
import {ILogin} from "./interfaces/ILogin";
import {HttpService} from "./http.service";
import {IEventForm} from "./interfaces/IEventForm";
import { v4 as uuidv4 } from 'uuid';
import {DataService} from "./data.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {INewUserForm} from "./interfaces/INewUserForm";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn: boolean = false;
  isCreateNew: boolean =false;

  //set a new variable selectedEvent
  selectedEvent: IEventForm | null = null;
  selectedUser: INewUserForm | null= null;

  accountList: ILogin[]=[
      {email:'test@test', password:'hello123'}
  ]
   newUserList: INewUserForm[]= [
     {
       id:'',
       email:'test@test',
       Name:'test',
       password:'hello123',
       confirmPassword:'hello123'
     }
   ]


  constructor(private dataService: DataService, private httpService:HttpService ) {

    //access the eventList with in my component
    this.dataService.$selectedEvent.subscribe(
      (selectedEvent) => {
        this.selectedEvent = selectedEvent;
    }
    )
    //grab the value from the dataService and stores locally

    // this.dataService.$selectedUser.subscribe(
    //   (selectedUser) => {
    //     this.selectedUser = selectedUser;
    //
    //   }
    // )

  }

  //reaction to event
  onLogin(logincreds:ILogin){
    console.log('login!')
    console.log(logincreds)
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

   //create new user
  onUserClick(newUser: INewUserForm) {
    //console.log(newUser)
    console.log('create!')
    // field validation
    //  const result =this.newUserList.find((create) =>{
    //    return create.email === newUser.email &&
    //      create.Name === newUser.Name &&
    //      create.password === newUser.password &&
    //      create.confirmPassword === newUser.confirmPassword
    //  })
    // console.log(result);
    // if (result === undefined){
    //   console.log('invalid account')
    //   return;
    // }
    this.isCreateNew = true;
  }
  // this.httpService.findUserByEmail()
  //
  // }
}













