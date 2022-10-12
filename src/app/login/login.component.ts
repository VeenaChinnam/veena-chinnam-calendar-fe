import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ILogin} from "../interfaces/ILogin";
import {HttpService} from "../http.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  @Output() onLogin=new EventEmitter<ILogin>();
  //constructor(private httpService : HttpService) { }

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
}
