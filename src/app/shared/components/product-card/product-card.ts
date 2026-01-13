import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { Product } from '@interfaces';
import { RouterLink } from "@angular/router";
import { CartStore } from 'src/app/store/cart.store';
import { ShowIfDirective } from '../../directives/app-show-if.directive';

interface ProductCardConfig {
  showViewProduct: boolean;
}
@Component({
  selector: 'app-product-card',
  imports: [RouterLink, ShowIfDirective],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCard {

  product = input<Product | null>(null);
  config = input<ProductCardConfig>({
    showViewProduct: true
  });
  handleAdd = output<Product>();
  cartStore = inject(CartStore);

  onAdd(product: Product | null) {
    if (!product) return;
    this.handleAdd.emit(product);
  }

  isInCart = computed(() => {
    const product = this.product();
    if (!product) return false;
    return this.cartStore.products().some(p => p.id === product.id);
  });
}
