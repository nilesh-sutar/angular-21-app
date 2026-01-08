import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';
import { AppHttpInterceptor } from './core/http.interceptor';

// NgRx
import { provideStore } from '@ngrx/store';
import { provideState } from '@ngrx/store';
import { counterReducer } from '@states/reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
    provideStore({}),
    provideState({ name: 'counter', reducer: counterReducer })
  ]
};
