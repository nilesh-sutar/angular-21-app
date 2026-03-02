import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStore } from '../store/auth.store';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    private authStore = inject(AuthStore);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authStore.token();

        if (token) {
            const clone = req.clone({
                setHeaders: { 'Authorization': `Bearer ${token}` }
            });
            console.log('HTTP Request with Token:', clone);
            return next.handle(clone);
        }

        console.log('HTTP Request without Token:', req);
        return next.handle(req);
    }
}
