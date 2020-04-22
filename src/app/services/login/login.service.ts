import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router
  ) { }

  login() {
    // if (user.userName !== '' && user.password !== '' ) {
    this.loggedIn.next(true);
    this.router.navigate(['/my-projects']);
    // }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}