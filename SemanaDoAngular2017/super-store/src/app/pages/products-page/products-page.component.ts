import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/providers/menu.service';
import { ProductsService } from 'src/app/providers/products.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.sass']
})
export class ProductsPageComponent implements OnInit {

  constructor(public menu: MenuService, public productsService: ProductsService) { }

  ngOnInit() {
  }

}
