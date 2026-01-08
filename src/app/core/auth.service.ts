import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _token: string | null = null;

    login(username: string, password: string) {
        // stub: replace with real API call
        this._token = 'fake-token';
        return Promise.resolve(true);
    }

    logout() {
        this._token = null;
    }

    get token() {
        return this._token;
    }
}
