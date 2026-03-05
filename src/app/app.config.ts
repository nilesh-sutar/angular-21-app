import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { AppHttpInterceptor } from './core/http.interceptor';

import { provideToastr } from 'ngx-toastr';
// NgRx
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { cartReducer } from '@states/cart/cart.reducer';
import { counterReducer } from '@states/counter/counter.reducer';
import { productReducer } from '@states/products/product.reducer';
import { initApp } from './init-app';
import { ProductEffects } from './states/products/product.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withHashLocation()),
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi()),
    provideStore({}),
    provideState({ name: 'counter', reducer: counterReducer }),
    provideState({ name: 'cart', reducer: cartReducer }),
    provideState({ name: 'products', reducer: productReducer }),
    provideEffects(ProductEffects),
    provideAnimations(), // required animations providers
    provideToastr({
      positionClass: 'toast-bottom-right',
      progressBar: true
    }), // Toastr

    /* Old way */
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: () => initApp(),
    //   multi: true
    // },

    /* New way */
    provideAppInitializer(() => {
      const initializerFn = initApp();
      return initializerFn();
    })
  ]
};
