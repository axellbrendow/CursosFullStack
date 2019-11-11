import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  newItem: any = {
    qty: 0,
    product: {}
  }

  items: any[] = [];

  constructor(public storage: StorageService)
  {
    // sobrescreve o vazio pelo o que estiver no storage
    this.items = storage.get('cart') || [];
  }

  // adiciona um item ao carrinho
  add(item: any = {})
  {
    return new Promise(
      (resolve, reject) => {
        if (!item.id)
        {
          reject('Falha na inserção. O item recebido não tem id:\n' + item);
        }

        else
        {
          let exists = false;
          // logica pra percorrer os itens do carrinho e atualizar +1 caso existir
          this.items.map(
            (row) => {
              // se o item ja estiver no carrinho, atualiza a quantidade
              if (row.product.id == item.id)
              {
                row.qty++;
                exists = true;
              }
            }
          );

          // senao adiciona um novo item
          if (!exists) {
            this.newItem.product = item;
            this.newItem.qty = 1;
            this.items.push(this.newItem);
            console.log(`newItem = ${JSON.stringify(this.newItem)}`);
          }

          this.storage.set('cart', this.items); // atualiza o storage
          resolve(this.items); // apenas resolve a promessa
        }
      }
    );
  }

  // zera o carrinho
  clear()
  {
    this.storage.set('cart', []);
    this.items = [];

    console.info('Carrinho vazio.');
  }
}

