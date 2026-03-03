import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { Product } from '@interfaces';
import { CartStore } from 'src/app/store/cart.store';
import { Button } from "../button/button";

interface ProductCardConfig {
  showAddToCart?: boolean;
}
@Component({
  selector: 'app-product-card',
  imports: [RouterLink, Button, NgOptimizedImage],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCard {

  product = input<Product | null>(null);
  config = input<ProductCardConfig>({
    showAddToCart: true
  });
  handleAdd = output<Product>();
  cartStore = inject(CartStore);
  router = inject(Router);

  onAdd(product: Product | null) {
    if (!product) return;
    this.handleAdd.emit(product);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  isInCart = computed(() => {
    const product = this.product();
    if (!product) return false;
    return this.cartStore.products().some(p => p.id === product.id);
  });

  buttonLabel = computed(() => {
    return this.cartStore.loadingProductId() === this.product()?.id ? 'Adding to cart...' : 'Add to Cart';
  });
}
