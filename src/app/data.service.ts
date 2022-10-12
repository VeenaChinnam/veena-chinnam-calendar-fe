import { Injectable } from '@angular/core';
import {IEventForm} from "./interfaces/IEventForm";
import {v4 as uuidv4} from "uuid";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {


  //set a new variable selectedEvent
  private selectedEvent: IEventForm | null = null;
  $selectedEvent = new Subject<IEventForm | null>();


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


  constructor() { }

  //to run update func
  //logic for setting the selectedEvent to an existingEvent
  setSelectedEvent(id: string){
    console.log(id)
    //this.isCreating = true;
    const event =  this.eventList.find(event => event.id === id);
    if(event === undefined){
      console.error('unable to find contact');
      return;
    }
    this.selectedEvent = {...event};
    this.$selectedEvent.next(this.selectedEvent)
    //we will have values in the event form
    //instead of setting the reference we created the copy of object,
    // passing by value instead of reference
  }

  cancelSelectedContact(){
    this.selectedEvent= null;
    this.$selectedEvent.next(this.selectedEvent);
  }


  createNewEvent(){
    //this.isCreating = true;
    this.selectedEvent ={
      id: "",
      EventDate: new Date(),
      EventTitle: "",
      EventDescription: "",
    }
    //set the value
    //next-updates the data inside of the subject
    this.$selectedEvent.next(this.selectedEvent)
  }

  deleteEvent(id: string){
    console.log(id);
    this.eventList= this.eventList.filter(eventinfo => eventinfo.id !== id);
    this.$eventList.next(this.eventList);
  }

  onEventInputSubmit(eventinfo: IEventForm) {
    if(eventinfo.id === ""){
      this.addEvent(eventinfo);
    }else {
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
      console.error('unable to find updateEvent in the List')
      return
    }
    this.eventList[index] = updateEvent;
    this.$eventList.next(this.eventList);
  }

}