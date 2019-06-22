import { Component, OnInit } from '@angular/core';
import { PeopleService } from 'src/app/providers/people.service';
import { TabsService } from 'src/app/providers/tabs.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.sass']
})
export class PeopleListComponent implements OnInit {

  constructor(public peopleService: PeopleService, public tabsService: TabsService) { }

  ngOnInit() {
  }

}
