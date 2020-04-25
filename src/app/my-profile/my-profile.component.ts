import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {
  currentUser;
  addressForm = this.fb.group({
    fullName: [null, Validators.required],
    email: [null, Validators.required],
    phoneNr: [null, Validators.required]
  });

  hasUnitNumber = false;
  fieldsReadonly = true;

  constructor(private fb: FormBuilder, private loginService: LoginService, private _snackBar: MatSnackBar) {
    this.loginService.currentUser.subscribe(x => this.currentUser = x);

    this.addressForm.controls['fullName'].setValue(this.currentUser.userName);
    this.addressForm.controls['email'].setValue(this.currentUser.userEmail);
    this.addressForm.controls['phoneNr'].setValue(this.currentUser.userPhone);

  }

  toggleReadonly(type) {
    this.fieldsReadonly = !this.fieldsReadonly;
    if (type == 'save') {
      this._snackBar.open('Datele personale au fost modificate cu succes !', null, { duration: 2000 });
    }
  }
}
