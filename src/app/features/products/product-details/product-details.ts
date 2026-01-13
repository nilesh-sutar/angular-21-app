import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/config/interfaces/interfaces';
import { ProductCard } from 'src/app/shared/components/product-card/product-card';
import { CartStore } from 'src/app/store/cart.store';
import { ProductStore } from 'src/app/store/product.store';

@Component({
  selector: 'app-product-details',
  imports: [ProductCard],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {
  productStore = inject(ProductStore);
  product = signal<Product | null>(null);
  route = inject(ActivatedRoute);
  cartStore = inject(CartStore);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchProductById(id);
  }

  async fetchProductById(id: number) {
    const product = await this.productStore.fetchProductById(id);
    this.product.set(product);
  }

  async onAdd(product: Product) {
    this.cartStore.addToCart(product);
  }

}
