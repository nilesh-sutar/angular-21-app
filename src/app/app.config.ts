import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { AppHttpInterceptor } from './core/http.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
// NgRx
import { provideStore } from '@ngrx/store';
import { provideState } from '@ngrx/store';
import { counterReducer } from '@states/counter/counter.reducer';
import { cartReducer } from '@states/cart/cart.reducer';
import { productReducer } from '@states/products/product.reducer';
import { provideEffects } from '@ngrx/effects';
import { ProductEffects } from './states/products/product.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
    provideHttpClient(),
    provideStore({}),
    provideState({ name: 'counter', reducer: counterReducer }),
    provideState({ name: 'cart', reducer: cartReducer }),
    provideState({ name: 'products', reducer: productReducer }),
    provideEffects(ProductEffects),
    provideAnimations(), // required animations providers
    provideToastr({
      positionClass: 'toast-bottom-right',
      progressBar: true
    }), // Toastr providers
  ]
};
