import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {IEventForm} from "../interfaces/IEventForm";
import {DataService} from "../data.service";
import {HttpService} from "../http.service";
import {first} from "rxjs";
import {EventListService} from "../event-list.service";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent  {

  Event: any;

  //instead of data coming from the parent  through an i/p, data come to the service in the constructor
  List: IEventForm[];
  displayList!: IEventForm[];
  searchText: string = "";


  constructor(private dataService: DataService, private httpService:HttpService) {

    this.List = this.dataService.eventList;
    this.displayList = [...this.List];


    this.dataService.$eventList.subscribe((newList) => {
      console.log(newList)
      this.List = newList;
      this.displayList = [...this.List];

    })
  }
  ngOnDestroy(){
    this.displayList = [...this.List];

  }

    filterList(searchText: any) {
      this.displayList = this.List.filter((event) =>{
      return event.EventTitle.includes(searchText);
    })

  }
  //creating new event
  onClick(){
    console.log('hello')
    this.dataService.createNewEvent();
    this.httpService.createNewEvent(this.Event)
  }

  onLogOut(){
    console.log('logOut')
  }

}
