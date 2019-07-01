import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/providers/menu.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  public modal: boolean = false;

  constructor(public menu: MenuService) { }

  ngOnInit() {
    document.addEventListener('scroll',
      (event) =>
      {
        if (document.documentElement.scrollTop > 20 ||
            document.body.scrollTop > 20 )
        {
          $('app-header nav').addClass('is-fixed-top');
        }

        else
        {
          $('app-header nav').removeClass('is-fixed-top');
        }
        
        this.menu.fix();

      }, true
    );
  }

  showSearch()
  {
    this.modal = true;
  }

  hideSearch()
  {
    this.modal = false;
  }

}
