import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@interfaces';
import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { AuthService } from './../core/auth.service';
export interface AuthState {
    token: string | null;
    userData: User | null;
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
    withMethods(({ authService, ...store }) => ({
        fetchUserData: async () => {
            try {
                const userData = await authService.getCurrentUser().toPromise();
                patchState(store, { userData });
                const authStoreData = { token: store.token(), userData };
                localStorage.setItem('authStore', JSON.stringify(authStoreData));
            } catch (error) {
                console.error('Error fetching user data:', error);
                patchState(store, { error: 'Failed to fetch user data' });
            }
        },
    })),
    withMethods(({ authService, router, ...store }) => ({
        init: () => {
            const storedAuth = localStorage.getItem('authStore');
            if (storedAuth) {
                try {
                    const authData = JSON.parse(storedAuth);
                    if (authData.token && authData.userData) {
                        patchState(store, {
                            token: authData.token,
                            userData: authData.userData,
                            isAuthenticated: true
                        });
                    }
                } catch (error) {
                    console.error('Error parsing auth data from localStorage:', error);
                    localStorage.removeItem('authStore');
                }
            }
        },
        login: async (username: string, password: string) => {
            patchState(store, { isLoading: true, error: "" });
            try {
                const response = await authService.login(username, password).toPromise();
                patchState(store, { token: response?.accessToken, isLoading: false, isAuthenticated: true });
                localStorage.setItem('authStore', JSON.stringify({ token: response?.accessToken }));

                // Fetch user data after successful login
                store.fetchUserData();
            }
            catch (error: any) {
                patchState(store, {
                    error: error?.error || 'Login failed !', isLoading: false, isAuthenticated: false
                });
            }
        },
        logout: () => {
            patchState(store, { token: null, userData: null, isAuthenticated: false });
            localStorage.removeItem('authStore');
            router.navigate(['/auth/login']);
        }
    }))

)