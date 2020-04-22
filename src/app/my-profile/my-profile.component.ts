import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {
  addressForm = this.fb.group({
    fullName: [null, Validators.required],
    email: [null, Validators.required],
    phoneNr: [null, Validators.required]
  });

  hasUnitNumber = false;

  constructor(private fb: FormBuilder) {
    this.addressForm.controls['fullName'].setValue('Sebastian Muresan');
    this.addressForm.controls['email'].setValue('sebastian.test@yahoo.com');
    this.addressForm.controls['phoneNr'].setValue('0714963254');

  }

  onSubmit() {
    alert('Thanks!');
  }
}
