import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {IEventForm} from "../interfaces/IEventForm";
import {DataService} from "../data.service";
import {HttpService} from "../http.service";
import {first} from "rxjs";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  // Events !:IEventForm;
  Events : null = null;
  EventDate: Date = new Date();
  EventTitle: string="";
  EventDescription:string ="";

  @Input() Event!:IEventForm;
  //pass the data into the comp


  constructor(private dataService: DataService,private httpService: HttpService) {


  }

  // getEvents(){
  //   this.httpService.getEvents().subscribe({
  //     next: (Event) => {
  //       console.log(Event)
  //       this.Events = this.Event;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //
  //     }
  //   })
  //   console.log(this.Events)
  // }

  createNewEvent() {
    const newEvent = {
      EventDate: this.EventDate,
      EventTitle: this.EventTitle,
      EventDescription: this.EventDescription,

    }
    this.httpService.createNewEvent(newEvent).pipe(first()).subscribe({
      next: (Event) => {
        //console.log(displayList)
        // this.getEvents();
        this.createNewEvent();
        // this.Events;
      }
      // error: (err) => {
      //   console.error(err);
      //
      //
      // }
    })
  }

  ngOnInit(): void {
    //to verify the data is there or not
    console.log(this.Event)
    //this.httpService.createNewEvent(this.Events)
  }
  onDeleteClick() {
    this.dataService.deleteEvent(this.Event.id);
    // this.httpService.createNewEvent(this.Events)
    //emit the id by contact
    // this.onDelete.emit(this.Event.id)
  }

  onUpdateClick(){
    this.dataService.setSelectedEvent(this.Event.id);
    // this.httpService.createNewEvent(this.Events);
    // this.createNewEvent();
  }

}
