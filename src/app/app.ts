import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import { selectCartProducts } from './states/cart/cart.selectors';
import { AppState } from './states/app.state';
import { Store } from '@ngrx/store';
import { CartStore } from './store/cart.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular21demo');
  cartStore = inject(CartStore);

  private store = inject(Store<AppState>);
  cartCount$ = this.store.select(selectCartProducts).pipe(map(products => products.length));

}
