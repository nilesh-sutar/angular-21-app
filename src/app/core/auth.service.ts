import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { User } from '@interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _token: string | null = null;
    http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    login(_username: string, _password: string) {
        return this.http.post<{ accessToken: string }>(`${this.apiUrl}/auth/login`, { username: _username, password: _password, expiresInMins: 30 })
    }

    logout() {
        this._token = null;
    }

    getCurrentUser() {
        return this.http.get<User>(`${this.apiUrl}/auth/me`)
    }

    get token() {
        return this._token;
    }
}
