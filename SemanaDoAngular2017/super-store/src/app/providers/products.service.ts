import { Injectable } from '@angular/core';

declare var require: any

const products = require('./products.json');
let BASEURL = window.location.href;
BASEURL = BASEURL.substring(0, BASEURL.length - 1);

import * as _ from 'lodash';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  list() {
    return new Promise(
      (resolve, reject) =>
      {
        products.map((product, i) => {
          // título no-formato-de-slug
          products[i].titleSlug = _.kebabCase(product.name);
          // a rota deste post
          products[i].router = '/products/' + products[i].titleSlug + '/' + products[i].id;
          // a url deste post
          products[i].url = BASEURL + products[i].router;
        });

        resolve(products); // resolve a lista de posts
      }
    );
  }

  getProduct(id: any)
  {
    return new Promise(
      (resolve, reject) =>
      {
        this.list().then(
          (products: any[]) =>
          {
            let product = _.find(products, (p) => p.id == id);

            // se tiver post resolve, senão rejeita
            return product ? resolve(product) : reject(`Produto não encontrado. id: ${id}`);
          }
        );
      }
    );
  }

  search(keyword: string)
  {
    return new Promise(
      (resolve, reject) =>
      {
        this.list().then(
          (products: any[]) =>
          {
            let items: any[];

            if (products.length)
            {
              items = _.filter(products,
                (p) =>
                {
                  return p.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase());
                }
              );
            }

            resolve(items);
          }
        );
      }
    );
  }

  scrollTop()
  {
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: 0
      },
      0
    );
  }
}
