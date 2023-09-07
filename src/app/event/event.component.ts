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

  Events : null = null;
  EventDate: Date = new Date();
  EventTitle: string="";
  EventDescription:string ="";

  @Input() event!:IEventForm;
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
        this.createNewEvent();
      }

    })
  }
  ngOnInit(): void {
    //to verify the data is there or not
    console.log(this.event)
    //this.httpService.createNewEvent(this.Events)
  }
  onDeleteClick() {
    this.dataService.deleteEvent(this.event.id);
    // this.httpService.createNewEvent(this.Events)
    //emit the id by contact
  }

  onUpdateClick(){
    this.dataService.setSelectedEvent(this.event.id);
    // this.httpService.createNewEvent(this.Events);

  }

}
