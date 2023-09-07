import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ILogin} from "../interfaces/ILogin";
import {INewUserForm} from "../interfaces/INewUserForm";
import {DataService} from "../data.service";
import {first} from "rxjs";
import {HttpService} from "../http.service";
import {IEventForm} from "../interfaces/IEventForm";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  // @Output() onSubmit = new EventEmitter<INewUserForm>;
  // @Output() onCreate = new EventEmitter<INewUserForm>();

  @Input() user!: INewUserForm;

  users: any = null;
  userIdInput: string="";
  Name: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";


  ngOnInit(): void {
  }

  constructor(private httpService: HttpService, private dataService:DataService) {
    this.getUsers();

  }

  getUsers() {
    this.httpService.getUsers().pipe(first()).subscribe({
      next: (Name) => {
        console.log(Name)
        this.users = this.Name;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  createUser() {
    const newUser = {
      id: new Date(),
      Name: this.Name,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    }
    this.httpService.createUser(newUser).pipe(first()).subscribe({
      next: (data) => {
        console.log(data);
        this.getUsers();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  deleteUser() {
    const id = parseInt(this.userIdInput);
    this.httpService.deleteUser(id).subscribe({
      next:(data) =>{
        console.log(data);
        this.getUsers();
      },
      error: (err) =>{
        console.error(err);
      }

  })
  }
}



