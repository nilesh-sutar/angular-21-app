import { Routes } from '@angular/router';
export const authRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    {
        path: 'login',
        loadComponent: () => import('./login').then(m => m.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('./register').then(m => m.Register)
    }
]