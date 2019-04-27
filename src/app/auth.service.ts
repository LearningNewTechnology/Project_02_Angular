import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public login(userInfo: User) {
    localStorage.setItem('USER', JSON.stringify(userInfo));
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('USER') !== null;
  }

  public logout() {
    localStorage.removeItem('USER');
  }
}
