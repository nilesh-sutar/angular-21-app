import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Product } from '@interfaces';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RatingModal } from 'src/app/features/products/modals/rating/rating.modal';
import { CartStore } from 'src/app/store/cart.store';
import { Button } from '../button/button';
import { Rating } from '../rating/rating';

interface ProductCardConfig {
  showAddToCart?: boolean;
  showLeftContent?: boolean;
  hideProductImage?: boolean;
}
@Component({
  selector: 'app-product-card',
  imports: [RouterLink, Button, NgOptimizedImage, Rating],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BsModalService],
})
export class ProductCard {
  product = input<Product | null>(null);
  config = input<ProductCardConfig>({});

  // resolved config with defaults merged
  resolvedConfig = computed(() => {
    const c = this.config();
    return {
      showAddToCart: c.showAddToCart ?? true,
      showLeftContent: c.showLeftContent ?? false,
      hideProductImage: c.hideProductImage ?? false,
    };
  });

  handleAdd = output<Product>();
  cartStore = inject(CartStore);
  router = inject(Router);
  modalService = inject(BsModalService);
  bsModalRef?: BsModalRef;

  productImages = computed(() => {
    const product = this.product();
    if (product?.images.length == 1) {
      return [product.images[0], product.images[0], product.images[0]];
    }
    return product ? product.images : [];
  });

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
    return this.cartStore.products().some((p) => p.id === product.id);
  });

  buttonLabel = computed(() => {
    return this.disableButton() ? 'Adding to cart...' : 'Add to Cart';
  });

  productImage = computed(() => {
    const product = this.product();
    return product?.images[0] ?? '';
  });

  disableButton = computed(() => {
    return this.cartStore.loadingProductId() === this.product()?.id;
  });

  discountedPrice = computed(() => {
    const product = this.product();
    if (!product) return 0;
    const discount = (product.price * product.discountPercentage) / 100;
    return (product.price - discount).toFixed(2);
  });

  openRatingModal() {
    this.bsModalRef = this.modalService.show(RatingModal);
    this.bsModalRef.content.modalData.set({
      product: this.product(),
      list: this.product()?.reviews,
      title: 'Ratings and reviews',
    });
  }
}
