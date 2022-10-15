import { Injectable } from '@angular/core';
import {IEventForm} from "./interfaces/IEventForm";
import {first, Subject} from "rxjs";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class EventListService {

  Events : any=null;
  EventDate: Date = new Date();
  EventTitle: string="";
  EventDescription:string ="";



  constructor(private httpService: HttpService) {
    this.getEvents();
  }
  getEvents() {
    this.httpService.getEvents().pipe(first()).subscribe({
      next: (data) => {
        console.log(data)
        this.Events = data;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }


  createNewEvent() {
    const newEvent={
      EventDate: this.EventDate,
      EventTitle: this.EventTitle,
      EventDescription: this.EventDescription,

    }
    this.httpService.createNewEvent(newEvent).pipe(first()).subscribe({
      next:(data) =>{
        console.log(data)
        this.getEvents();
        this.createNewEvent();
    },
      error: (err) =>{
        console.error(err)
    }
    })
  }


}
