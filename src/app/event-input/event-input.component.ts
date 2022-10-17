import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IEventForm} from "../interfaces/IEventForm";
import {DataService} from "../data.service";
import {first, Subscription} from "rxjs";
import {HttpService} from "../http.service";

@Component({
  selector: 'app-event-input',
  templateUrl: './event-input.component.html',
  styleUrls: ['./event-input.component.css']
})
export class EventInputComponent implements OnInit {

  Event  = "";
  EventDate: Date = new Date();
  EventTitle: string="";
  EventDescription:string ="";


    @Input() event!: IEventForm;

  constructor(private dataService: DataService, private httpService:HttpService) {
    this.createNewEvent();
  }


  createNewEvent() {
    const newEvent = {
      EventDate: "",
      EventTitle: "",
      EventDescription: "",

    }
    this.httpService.createNewEvent(newEvent).pipe(first()).subscribe({
      next: (Event) => {
        // this.createNewEvent();
        // this.Event;
      }
    })
  }

  ngOnInit(): void {
  }
  ngOnDestroy(){

  }

  onCancelClick(){
    console.log('cancel')
    this.dataService.cancelSelectedEvent();
  }
  onSubmitClick() {
    console.log(this.event)
    //change the date string to object in the console log
    this.event.EventDate = new Date(this.EventDate);

    this.dataService.onEventInputSubmit(this.event);
    // this.httpService.createNewEvent(this.Event)

  }

}
