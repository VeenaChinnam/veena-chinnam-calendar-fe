import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {IEventForm} from "../interfaces/IEventForm";
import {DataService} from "../data.service";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {


  @Input() Event!:IEventForm;
  //pass the data into the comp


  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {
    //to verify the data is there or not
    console.log(this.Event)
  }
  onDeleteClick() {
    this.dataService.deleteEvent(this.Event.id);
    //emit the id by contact
    // this.onDelete.emit(this.Event.id)
  }

  onUpdateClick(){
    this.dataService.setSelectedEvent(this.Event.id);
  }

}
