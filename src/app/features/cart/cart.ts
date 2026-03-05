import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@interfaces';
import { CartStore } from '../../store/cart.store';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CurrencyPipe, NgOptimizedImage],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Cart {
  cartStore = inject(CartStore);

  onRemove(product: Product) {
    if (confirm('Are you sure, really want to remove from cart ?')) {
      this.cartStore.removeFromCart(product);
    }
  }

}
