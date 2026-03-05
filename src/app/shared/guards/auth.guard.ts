import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStore } from 'src/app/store/auth.store';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    authStore = inject(AuthStore);
    router = inject(Router);
    canActivate(
        _route: ActivatedRouteSnapshot,
        _state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authStore.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(['/auth/login'], { queryParams: { returnUrl: _state.url } });
            return false;
        }
    }
}
