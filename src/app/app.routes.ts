import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    {
        path: 'home',
        loadComponent: () => import('./features/home/home').then(m => m.Home)
    },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
    },
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
    {
        path: 'user',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/user/user').then(m => m.User)
    },
    {
        path: 'not-found',
        loadComponent: () => import('./core/components/not-found').then(m => m.NotFound)
    },
    {
        path: '**',
        redirectTo: 'not-found'
    }
];
