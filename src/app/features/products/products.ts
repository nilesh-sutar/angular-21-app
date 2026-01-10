import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Product } from '@interfaces';
import { Store } from '@ngrx/store';
import { selectAllProducts, selectProductError } from '@states/products/product.selectors';
import { Observable } from 'rxjs';
import { ProductCard } from "src/app/shared/components/product-card/product-card";
import { ProductApi } from 'src/app/shared/services/product-api';
import { addToCart } from 'src/app/states/cart/cart.actions';
import { fetchProducts } from 'src/app/states/products/product.actions';
import { AppState } from 'src/app/states/app.state';

@Component({
  selector: 'app-products',
  imports: [AsyncPipe, ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  store = inject(Store<AppState>);
  products$!: Observable<Product[]>;
  productsError$!: Observable<string | undefined>;

  ngOnInit() {
    this.store.dispatch(fetchProducts());
    this.products$ = this.store.select(selectAllProducts);
    this.productsError$ = this.store.select(selectProductError);
  }

  onAdd(product: Product) {
    this.store.dispatch(addToCart({ product }));
  }
}
