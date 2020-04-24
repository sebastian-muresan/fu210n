
import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  error: string;
  loading = false;
  constructor(private router: Router, private loginService: LoginService) { }

  form: FormGroup = new FormGroup({
    userEmail: new FormControl(''),
    userPassword: new FormControl(''),
  });

  get formControls() {
    return this.form.controls;
  }

  submit() {
    console.log('userEmail : ' + this.formControls.userEmail.value);
    console.log('userPassword : ' + this.formControls.userPassword.value);
    this.loginService.login(this.formControls.userEmail.value, this.formControls.userPassword.value).pipe(first()).subscribe(
      data => {
        this.router.navigate(['/my-projects']);
      },
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }
  //@Input() error: string | null;

  @Output() submitEM = new EventEmitter();
}
