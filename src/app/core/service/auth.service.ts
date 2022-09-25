import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  tokenKey: string = 'token';
  constructor() {}
  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }
  deleteToken() {
    localStorage.removeItem(this.tokenKey);
  }
}
