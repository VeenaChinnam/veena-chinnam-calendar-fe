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

  Events !:IEventForm;

  @Input() Event!:IEventForm;
  //pass the data into the comp


  constructor(private dataService: DataService,private httpService: HttpService) {


    this.httpService.getEvents().subscribe({
      next: (Event) => {
        console.log(Event)
        this.Events = this.Event;
      },
      error: (err) => {
        console.log(err);

      }
    })
    console.log(this.Events)

  }



  ngOnInit(): void {
    //to verify the data is there or not
    console.log(this.Event)
    this.httpService.createNewEvent(this.Events)
  }
  onDeleteClick() {
    this.dataService.deleteEvent(this.Event.id);
    this.httpService.createNewEvent(this.Events)
    //emit the id by contact
    // this.onDelete.emit(this.Event.id)
  }

  onUpdateClick(){
    this.dataService.setSelectedEvent(this.Event.id);
    this.httpService.createNewEvent(this.Events)
  }

}
