import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'products' },
    {
        path: 'counter',
        loadComponent: () => import('./features/counter/counter.component').then(m => m.CounterComponent)
    },
    {
        path: 'products',
        loadComponent: () => import('./features/products/products').then(m => m.Products)
    },
    {
        path: 'products/:id',
        loadComponent: () => import('./features/products/product-details/product-details').then(m => m.ProductDetails)
    },
    {
        path: 'cart',
        loadComponent: () => import('./features/cart/cart').then(m => m.Cart)
    },
];
