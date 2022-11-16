import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private jwt: JwtService) {}

  isLoggedIn(): boolean {
    return this.jwt.isActive();
  }

  hasPermission(): boolean {
    return true;
  }
}
