import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../store/auth.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _token: string | null = null;
    http = inject(HttpClient);

    login(_username: string, _password: string) {
        return this.http.post<{ token: string }>('https://fakestoreapi.com/auth/login', { username: _username, password: _password })
    }

    logout() {
        this._token = null;
    }

   getUserData(id="1") {
       return this.http.get<User>(`https://fakestoreapi.com/users/${id}`)
    }

    get token() {
        return this._token;
    }
}
