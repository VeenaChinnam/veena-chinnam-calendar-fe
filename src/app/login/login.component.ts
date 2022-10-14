import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ILogin} from "../interfaces/ILogin";
import {HttpService} from "../http.service";
import {INewUserForm} from "../interfaces/INewUserForm";
import {DataService} from "../data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  @Output() onLogin = new EventEmitter<ILogin>();
  @Output() onCreate = new EventEmitter<INewUserForm>();

  constructor(private httpService : HttpService, dataService:DataService) { }

  email!: string;
  password!: string;

  ngOnInit(): void {
  }

  onClick(){
    console.log('hello')
    this.onLogin.emit({
      email:this.email,
      password:this.password
    });
  }

  onCreateUser(){
    console.log('clicked')
    this.onCreate.emit(
    );

  }

}
