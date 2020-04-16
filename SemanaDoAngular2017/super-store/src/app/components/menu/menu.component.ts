import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/providers/menu.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  public openEventSubject = new Subject<void>();

  public modal: boolean = false;

  constructor(public menu: MenuService) { }

  ngOnInit() {
  }

  showSearch()
  {
    this.modal = true;
    this.openEventSubject.next();
  }

  hideSearch()
  {
    this.modal = false;
  }

}
