import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Product } from '@interfaces';
import { Store } from '@ngrx/store';
import { selectAllProducts, selectProductError } from '@states/products/product.selectors';
import { Observable } from 'rxjs';
import { ProductCard } from "src/app/shared/components/product-card/product-card";
import { ProductApi } from 'src/app/shared/services/product-api';
import { addToCart } from 'src/app/states/cart/cart.actions';
import { fetchProducts } from 'src/app/states/products/product.actions';
import { AppState } from 'src/app/states/app.state';
import { CartStore } from 'src/app/store/cart.store';
import { ProductStore } from 'src/app/store/product.store';

@Component({
  selector: 'app-products',
  imports: [ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  store = inject(Store<AppState>);
  productsError = signal<string | undefined>(undefined);
  cartStore = inject(CartStore);
  productStore = inject(ProductStore);
  ngOnInit() {
    this.productStore.fetchProducts();
    this.productsError.set(this.productStore.error?.() ?? undefined);
  }

  onAdd(product: Product) {
    this.cartStore.addToCart(product);
  }
}
