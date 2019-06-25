import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  newItem: any = {
    qty: 0,
    product: {}
  }

  items: any[] = [];

  constructor() { }
}
