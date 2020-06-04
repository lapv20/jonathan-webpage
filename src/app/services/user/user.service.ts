import { Injectable } from '@angular/core';
import { ADMIN_CREDENTIALS } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isLogged: boolean;

  constructor() {
    console.warn('UserServie Constructor');
  }

  set isAuthenticated(val: boolean) {
    this.isLogged = val;
  }

  get isAuthenticated(): boolean {
    return this.isLogged;
  }

  logout() {
    this.isAuthenticated = false;
  }

  // A Dummy function to authenticate admin user
  checkAdminGivenCredentials(u: string, p: string): boolean {
    if (u === ADMIN_CREDENTIALS.email && p === ADMIN_CREDENTIALS.password) {
      return true;
    }
    return false;
  }
}
