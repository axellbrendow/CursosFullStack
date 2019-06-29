import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/providers/menu.service';
import { ProductsService } from 'src/app/providers/products.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements OnInit {

  constructor(public menu: MenuService, public productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.list().then(
      (products) =>
      {
        console.log(products);
      }
    );
  }

}
