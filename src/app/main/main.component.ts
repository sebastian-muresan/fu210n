import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { LoginService } from '../services/login/login.service';
import { RouterOutlet } from '@angular/router';
import { slider } from '../route-animations'
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [slider]
})
export class MainComponent implements OnInit {


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  isLoggedIn$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver, private loginService: LoginService) {
    this.loginService = loginService;
  }

  ngOnInit() {
    this.isLoggedIn$ = this.loginService.isLoggedIn;
  }

  onLogout() {
    this.loginService.logout();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }


}


