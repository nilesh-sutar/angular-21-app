import { Component, inject } from "@angular/core";
import { RouterLink } from '@angular/router';
import { ProductSearch } from "src/app/shared/components/product-search/product-search";
import { CartStore } from 'src/app/store/cart.store';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="javascript:void(0)">Logo</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="mynavbar">
      <div class="d-flex me-auto">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="javascript:void(0)">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="javascript:void(0)" routerLink="/products">Products</a>
        </li>
        <!-- <li class="nav-item">
          <a class="nav-link" href="javascript:void(0)">Link</a>
        </li> -->
      </ul>
        <app-product-search/>
      </div>
      <div class="d-flex me-3">
        <a class="nav-link text-white" routerLink="/cart">Cart</a>
        <span class="badge">
          {{ cartStore.products().length }}
        </span>
      </div>
    </div>
  </div>
</nav>
    `,
  imports: [RouterLink, ProductSearch],
})
export class Navbar {
  cartStore = inject(CartStore);
}