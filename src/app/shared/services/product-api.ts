import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '@interfaces';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductApi {
  http = inject(HttpClient);

  getProducts() {
    return this.http.get<Product[]>('https://fakestoreapi.com/products').
      pipe(map(products => products.map(product => ({ ...product, quantity: 1 }))));
  }

  getProductById(id: number) {
    return this.http.get<Product>(`https://fakestoreapi.com/products/${id}`).
      pipe(map(product => ({ ...product, quantity: 1 })));
  }
}
