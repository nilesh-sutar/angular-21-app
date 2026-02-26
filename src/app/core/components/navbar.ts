import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductSearch } from 'src/app/shared/components/product-search/product-search';
import { AuthStore } from 'src/app/store/auth.store';
import { CartStore } from 'src/app/store/cart.store';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="javascript:void(0)">
          <img src="https://www.google.com/logos/doodles/2026/icc-mens-t20-world-cup-super-8-feb-26-a-6753651837111043.2-s.png" alt="" />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mynavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mynavbar">
          <div class="d-flex me-auto">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="javascript:void(0)" routerLink="/home">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="javascript:void(0)" routerLink="/products">Products</a>
              </li>
            </ul>
            <app-product-search />
          </div>
          <div class="d-flex me-3">
            <a class="nav-link text-white" routerLink="/cart">
              <span class="material-icons"> shopping_cart </span>
            </a>
            <span class="badge">
              {{ cartStore.products().length }}
            </span>
            @if (authStore.isAuthenticated()) {
              <div class="dropdown">
                <button
                  type="button"
                  class="btn btn-primary dropdown-toggle btn-sm"
                  data-bs-toggle="dropdown"
                >
                  {{ (authStore.userData()?.name.firstname +" "+ authStore.userData()?.name.lastname | uppercase) || 'User' }}
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" (click)="authStore.logout()">Logout</a></li>
                </ul>
              </div>
            } @else {
              <button class="btn btn-primary btn-sm" type="button" routerLink="/auth/login">Login</button>
            }
          </div>
        </div>
      </div>
    </nav>
  `,
  imports: [RouterLink, ProductSearch, UpperCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  cartStore = inject(CartStore);
  authStore = inject(AuthStore);
}
