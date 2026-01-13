import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@interfaces';
import { Store } from '@ngrx/store';
import { AppState } from '@states/app.state';
import { selectCartProducts, selectCartTotal } from '@states/cart/cart.selectors';
import { decrementQuantity, emptyCart, incrementQuantity, removeFromCart } from 'src/app/states/cart/cart.actions';
import { CartStore } from '../../store/cart.store';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  private store = inject(Store<AppState>);
  cartItems$ = this.store.select(selectCartProducts);
  cartTotal$ = this.store.select(selectCartTotal);
  cartStore = inject(CartStore);

  onRemove(product: Product) {
    this.store.dispatch(removeFromCart({ product }));
  }

  onUpdateQuantity(product: Product, change: number) {
    if (change > 0) {
      this.store.dispatch(incrementQuantity({ product }));
    } else if (change < 0) {
      this.store.dispatch(decrementQuantity({ product }));
    }
  }

  onEmpty() {
    this.store.dispatch(emptyCart());
  }

}
