import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'counter' },
    {
        path: 'counter',
        loadComponent: () => import('./features/counter/counter.component').then(m => m.CounterComponent)
    }
];
