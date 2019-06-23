import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  opened: boolean = false;

  constructor() { }

  fix()
  {
    if (document.body.scrollTop > 65)
    {
      $('section.outer').addClass('margin-fix');
    }

    else
    {
      $('section.outer').removeClass('margin-fix');
    }
  }

  open()
  {
    this.opened = true;
    this.fix();
  }

  close()
  {
    this.opened = false;
  }
}
