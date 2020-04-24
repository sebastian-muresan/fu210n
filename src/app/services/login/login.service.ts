import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private apiUrl = 'https://proview-api.herokuapp.com/';

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private http: HttpClient) { }

  login(user) {
    this.http.post(this.apiUrl + 'users/login', user).subscribe(data => {
      console.log(data);
    });
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