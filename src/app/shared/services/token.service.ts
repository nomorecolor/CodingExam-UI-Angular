import { Injectable } from '@angular/core';
import { Token } from '../interfaces/token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  saveToken(token: Token | null) {
    console.log('token', token);
    localStorage.setItem('token', JSON.stringify(token));
  }

  getToken(): Token | null {
    const token = localStorage.getItem('token')!;

    if (token === undefined) return null;

    const user: Token = JSON.parse(token);
    return user !== null ? user : null;
  }

  getAccessToken(): string | null {
    const token = localStorage.getItem('token')!;

    if (token === undefined) return null;

    const user: Token = JSON.parse(token);
    return user !== null ? user.accessToken : null;
  }

  getRefreshToken(): string | null {
    const token = localStorage.getItem('token')!;

    if (token === undefined) return null;

    const user: Token = JSON.parse(token);
    return user !== null ? user.refreshToken : null;
  }

  clearToken() {
    localStorage.removeItem('token');
  }
}
