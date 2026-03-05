import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ProductCard } from 'src/app/shared/components/product-card/product-card';
import { ProductStore } from 'src/app/store/product.store';

@Component({
  selector: 'app-home',
  imports: [ProductCard],
  template: `<h2>Home</h2>
    <section class="mt-4">
      <p>Welcome to the Angular 21 demo application!</p>
      <p>
        This application demonstrates the new features and improvements in Angular 21, including
        standalone components, signals, and more.
      </p>
      <p>Explore the different sections to see these features in action.</p>
    </section>
    <section class="my-4">
      <!-- Carousel -->
      <div id="demo" class="carousel slide" data-bs-ride="carousel">
        <!-- Indicators/dots -->
        <div class="carousel-indicators">
          @for (slide of groupedProducts(); let i = $index; track i) {
            <button
              type="button"
              data-bs-target="#demo"
              [attr.data-bs-slide-to]="i"
              [class.active]="i === 0"
            ></button>
          }
        </div>

        <!-- The slideshow/carousel -->
        <div class="carousel-inner">
          @for (slide of groupedProducts(); let i = $index; track i) {
            <div class="carousel-item" [class.active]="i === 0">
              <div class="slide-container">
                @for (product of slide; track product.id) {
                  <div class="slide-item">
                    <app-product-card [product]="product" [config]="{ showAddToCart: false }" />
                  </div>
                }
              </div>
            </div>
          }
        </div>

        <!-- Left and right controls/icons -->
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#demo"
          data-bs-slide="prev"
        >
          <span class="material-icons text-black"> arrow_back_ios </span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#demo"
          data-bs-slide="next"
        >
          <span class="material-icons text-black"> arrow_forward_ios </span>
        </button>
      </div>
    </section> `,
  styleUrls: ['./home.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  productStore = inject(ProductStore);

  groupedProducts = computed(() => {
    const products = this.productStore.products();
    const grouped = [];
    for (let i = 0; i < products.length; i += 3) {
      grouped.push(products.slice(i, i + 3));
    }
    return grouped;
  });

  constructor() {
    if (this.productStore.products().length > 0) return;
    this.productStore.fetchProducts();
  }
}
