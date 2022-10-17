import { Injectable } from '@angular/core';
import {IEventForm} from "./interfaces/IEventForm";
import {v4 as uuidv4} from "uuid";
import {first, Subject} from "rxjs";
import {ILogin} from "./interfaces/ILogin";
import {HttpService} from "./http.service";
import {INewUserForm} from "./interfaces/INewUserForm";

@Injectable({
  providedIn: 'root'
})
export class DataService {


  //set a new variable selectedEvent
  private selectedEvent: IEventForm | null = null;
  $selectedEvent = new Subject<IEventForm | null>();

  // private selectedUser: INewUserForm | null = null;
  private selectedUser: INewUserForm | null = null;
  $selectedUser = new Subject<INewUserForm | null>();


  eventList: IEventForm[] = [

      {
        id: '123',
        EventDate: new Date(),
        EventTitle: 'Birthday Party',
        EventDescription: 'Vishva birthday at corn st',
      },
      {
        id: '231',
        EventDate: new Date(),
        EventTitle: 'Kids Going Out',
        EventDescription: 'going to WaterPark ',
      },
      //for seperating the events go to event.comp.css
    ];
      $eventList = new Subject<IEventForm[]>();

  userList: INewUserForm[]=[
    {
      id : '1',
      Name: 'test',
      email: 'test@test',
      password: 'hello123',
      confirmPassword: 'hello123',

    },
  ];
  $userList = new Subject<INewUserForm[]>();



  constructor(private httpService: HttpService) {

  }

  //to run update func
  //logic for setting the selectedEvent to an existingEvent
  setSelectedEvent(id: string){
    console.log(id)
    //this.isCreating = true;
    const eventinfo =  this.eventList.find(eventinfo => eventinfo.id === id);
    if(eventinfo === undefined){
      console.error('unable to find contact');
      return;
    }
    this.selectedEvent = {...eventinfo};
    this.$selectedEvent.next(this.selectedEvent);

    //we will have values in the event form
    //instead of setting the reference we created the copy of object,
    // passing by value instead of reference
  }

  cancelSelectedEvent (){
    this.selectedEvent= null;
    this.$selectedEvent.next(this.selectedEvent);

  }

  createNewEvent(){
    // this.isCreating = true;
    this.selectedEvent ={
      id: "",
      EventDate: new Date(),
      EventTitle: "",
      EventDescription: "",
    }
    //set the value
    //next-updates the data inside of the subject
    this.$selectedEvent.next(this.selectedEvent);

  }
  createNewUser(){
    console.log('newuser')
    this.selectedUser ={
      id:"",
      Name:"",
      email:"",
      password:"",
      confirmPassword:"",
    }
    this.$selectedUser.next(this.selectedUser);
  }

  deleteEvent(id: string){
    console.log(id);
    this.eventList= this.eventList.filter(eventinfo => eventinfo.id !== id);
    this.$eventList.next(this.eventList);
  }

  onEventInputSubmit(eventinfo: IEventForm) {
    console.log('submit1');
    if(eventinfo.id === ""){
      console.log('submit2');
      this.addEvent(eventinfo);

    }else {
      console.log('submit3')
      this.updateEvent(eventinfo);
    }
    this.selectedEvent = null;
    this.$selectedEvent.next(this.selectedEvent);


  }
  addEvent(eventinfo: IEventForm){
    eventinfo.id= uuidv4();
    //console.log(eventinfo)
    this.eventList.push(eventinfo);
    this.$eventList.next(this.eventList);

  }

  updateEvent(updateEvent: IEventForm){
    const index = this.eventList.findIndex(eventinfo => eventinfo.id === updateEvent.id);
    if(index === -1){
      console.error('unable to find updateEvent in the List');
      return
    }
    this.eventList[index] = updateEvent;
    this.$eventList.next(this.eventList);
  }

}
