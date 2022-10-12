import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IEventForm} from "../interfaces/IEventForm";
import {DataService} from "../data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-event-input',
  templateUrl: './event-input.component.html',
  styleUrls: ['./event-input.component.css']
})
export class EventInputComponent implements OnInit {

  @Input() event!: IEventForm;


  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
  }
  ngOnDestroy(){

  }

  onCancelClick(){
    console.log('cancel')
    this.dataService.cancelSelectedContact();
  }
  onSubmitClick() {
    console.log(this.event)
    //change the date string to object in the console log
    this.event.EventDate = new Date(this.event.EventDate);

    this.dataService.onEventInputSubmit(this.event)
  }

}
