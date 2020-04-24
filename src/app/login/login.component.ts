
import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(private router: Router, private loginService: LoginService) { }
  form: FormGroup = new FormGroup({
    userEmail: new FormControl(''),
    userPassword: new FormControl(''),
  });

  submit() {
    console.log('userEmail : ' + this.form.get('userEmail').value);
    console.log('userPassword : ' + this.form.get('userPassword').value);
    this.loginService.login({ userEmail: this.form.get('userEmail').value, userPassword: this.form.get('userPassword').value });
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
}
