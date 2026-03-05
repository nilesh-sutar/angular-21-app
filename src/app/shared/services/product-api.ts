import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Product } from '@interfaces';
import { map } from 'rxjs';

type ProductResponse = {
  limit: number;
  skip: number;
  total: number;
  products: Product[];
};
@Injectable({
  providedIn: 'root',
})
export class ProductApi {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getProducts() {
    return this.http.get<ProductResponse>(`${this.apiUrl}/products`).
      pipe(map(products => products.products.map(product => ({ ...product, quantity: 1 }))));
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`).
      pipe(map(product => ({ ...product, quantity: 1 })));
  }
}
