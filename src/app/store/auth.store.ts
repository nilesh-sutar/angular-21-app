import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { AuthService } from './../core/auth.service';
export interface AuthState {
    token: string | null;
    userData: any | null;
    error: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    token: null,
    userData: null,
    error: null,
    isLoading: false,
    isAuthenticated: false
};

export const AuthStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withProps(() => ({
        authService: inject(AuthService),
        router: inject(Router)
    })),
    withMethods(({ authService, router, ...store }) => ({
        login: async (username: string, password: string) => {
            patchState(store, { isLoading: true, error: "" });
            try {
                const response = await authService.login(username, password).toPromise();
                patchState(store, { token: response?.token, isLoading: false, isAuthenticated: true });
                const userData = await authService.getUserData().toPromise();
                patchState(store, { userData: userData });
            }
            catch (error: any) {
                patchState(store, {
                    error: error?.error || 'Login failed !', isLoading: false, isAuthenticated: false
                });
            }
        },
        logout: () => {
            patchState(store, { token: null, isAuthenticated: false });
            router.navigate(['/auth/login']);
        }
    }))

)