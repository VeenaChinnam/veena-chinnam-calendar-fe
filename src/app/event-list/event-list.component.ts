import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {IEventForm} from "../interfaces/IEventForm";
import {DataService} from "../data.service";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent  {

  //instead of data coming from the parent  through an i/p, data come to the service in the constructor
  List: IEventForm[];

  displayList!: IEventForm[];
  searchText: string = "";



  constructor(private dataService: DataService) {
    this.List = this.dataService.eventList;
    this.displayList = [...this.List];

    this.dataService.$eventList.subscribe((newList) => {
      console.log(newList)
      this.List = newList;
      this.displayList = [...this.List];
    })
  }

  // ngOnInit(): void {
  //   console.log(this.List)
  //   this.displayEvent = [...this.List];
  // }
  // ngOnChanges(changes: SimpleChanges) {
  //   this.displayEvent =[...this.List];
  //  }

    filterList(searchText: any) {
      this.displayList = this.List.filter((event) =>{
      return event.EventTitle.includes(searchText);
    })

}
  //creating new event
  onClick(){
    console.log('hello')
    this.dataService.createNewEvent();
  }



}
