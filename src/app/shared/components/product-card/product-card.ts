import { Component, input, output } from '@angular/core';
import { Product } from '@interfaces';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {

  product = input<Product>();
  handleAdd = output<Product>();
  onAdd(product?: Product) {
    if (!product) return;
    this.handleAdd.emit(product);
  }
}
