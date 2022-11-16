import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private token: string | null;

  constructor() {
    this.token = null;
  }

  getToken(): string | null {
    return this.token;
  }

  getTokenFromLocalStorage(): string | null {
    let token: string | null = localStorage.getItem('authentication-token');
    return token;
  }

  setToken(token: string): void {
    localStorage.setItem('authentication-token', token);
    this.token = token;
  }

  isActive(): boolean {
    if (this.token === null) return false;
    return true;
  }

  isTokenInLocalStorage(): boolean {
    if (this.getToken() === null) return false;
    return true;
  }

  removeToken(): void {
    this.token = null;
    localStorage.clear();
  }
}
