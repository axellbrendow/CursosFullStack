import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/providers/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  constructor(public menu: MenuService) { }

  ngOnInit() {
  }

}
