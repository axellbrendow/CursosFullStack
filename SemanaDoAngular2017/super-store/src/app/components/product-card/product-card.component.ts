import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/providers/cart.service';
import { ProductsService } from 'src/app/providers/products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass']
})
export class ProductCardComponent implements OnInit {

  // @Input() faz com que esse componente receba uma entrada como atributo da sua tag.
  // Ex.: @Input() products: ProductsService
  // Ex.: <app-product-card [products]="[ 0, 1, 2 ]"></app-product-card>

  // @Output() faz com que esse componente entregue uma saída (um evento) num atributo de sua tag.
  // Ex.: @Input() products: ProductsService
  // Ex.: @Output() response: boolean
  // Ex.: <app-product-card [products]="[ 0, 1, 2 ]" (response)="mostrarResposta($event)"></app-product-card>
  // Essas notações são para EventEmitters

  @Input() product: any = {};
  @Input() detailedView: boolean = false;

  constructor(public products: ProductsService, public cart: CartService) { }

  ngOnInit()
  {
    setTimeout(
      () =>
      {
        this.products.scrollTop();
      },
      0
    );
  }

  addToCart(item: any)
  {
    /* this.cart.add(item).then(
      () =>
      {
        console.info(item.name + ' adicionado/atualizado no carrinho');
      }
    ).catch(console.warn); */
  }
}
