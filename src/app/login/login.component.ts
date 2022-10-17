import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  // @Input() user!: INewUserForm;

  constructor(private httpService : HttpService,private dataService:DataService) {

  }
  id!:string;
  Name!: string;
  email!: string;
  password!: string;
 confirmPassword!: string;


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

    this.onCreate.emit({
      id:this.id,
      Name:this.Name,
      email:this.email,
      password:this.password,
      confirmPassword:this.confirmPassword
      });

   this.dataService.createNewUser();
  }

}
