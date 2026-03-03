import { NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, HostListener, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ProductSearchStore } from "src/app/store/product-search.store";

@Component({
  selector: 'app-product-search',
  styleUrls: ['./product-search.scss'],
  template: `
    <div class="product-search" (click)="onContainerClick()">
      <input type="text" class="form-control" (input)="onInputChange($event)" (focus)="showResults()" placeholder="Search products..." />
      @if (isResultsVisible()) {
        @if (products.results().length > 0) {
          <div class="search-results">
            <ul>
              @for (product of products.results(); track product.id) {
                  <li>
                     <img ngSrc="{{ product.image }}" alt="{{ product.title }}" width="30" height="30" />
                     <a routerLink="/products/{{ product.id }}" (click)="hideResults()">{{ product.title }}</a>
                  </li>
              }
            </ul>
          </div>
        } @else {
          <div class="search-results no-results">
            <p>No results found with text <strong>{{products.query()}}</strong></p>
          </div>
        }
      }
    </div>
  `,
  imports: [RouterLink, NgOptimizedImage]
})
export class ProductSearch {
  products = inject(ProductSearchStore);
  isResultsVisible = signal(false);
  private elementRef = inject(ElementRef);

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.products.searchProducts(input.value);
    if (input.value.trim()) {
      this.showResults();
    }
  }

  showResults() {
    this.isResultsVisible.set(true);
  }

  hideResults() {
    this.isResultsVisible.set(false);
  }

  onContainerClick() {
    // Prevent closing when clicking inside the container
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.hideResults();
    }
  }
}