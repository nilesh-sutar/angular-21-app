import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '@interfaces';
import { Store } from '@ngrx/store';
import { ProductCard } from "src/app/shared/components/product-card/product-card";
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
    if (this.productStore.products().length > 0) return;
    this.productStore.fetchProducts();
    this.productsError.set(this.productStore.error?.() ?? undefined);
  }

  onAdd(product: Product) {
    this.cartStore.addToCart(product);
  }
}
