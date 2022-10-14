import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ILogin} from "../interfaces/ILogin";
import {INewUserForm} from "../interfaces/INewUserForm";
import {DataService} from "../data.service";
import {HttpService} from "../http.service";
import {first} from "rxjs";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<INewUserForm>;
  users: any = null;
  Name: string ="";
  email: string ="";
  password: string = "";
  confirmPassword: string ="";



  ngOnInit(): void {
  }

  constructor(private httpService: HttpService , dataService:DataService) {
    this.getUsers();

  }
  getUsers(){
    this.httpService.getUsers().pipe(first()).subscribe({
      next:(Name) =>{
        console.log(Name)
        this.users=this.Name;
      },
      error:(err) => {
        console.error(err);
      }
    })
  }


  createUser(){
    const newUser ={id:new Date().getTime(),
      Name:this.Name,
      email:this.email,
    password:this.password,
    confirmPassword:this.confirmPassword}
    this.httpService.createUser(newUser).pipe(first()).subscribe({
      next:(data) =>{
        console.log(data);
        this.getUsers();
      },
      error:(err) => {
        console.error(err);
      }
    })

  }
  // onClickSubmit( ){
  //   console.log('createNew')
  //   this.onSubmit.emit();
  //  ;

  // }
  // onRegisterClick(){
  //
  // }
}
