import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NewMaterialDialogData } from '../DataTypes/data.types';
@Component({
  selector: 'app-add-material-dialog',
  templateUrl: './add-material-dialog.component.html',
  styleUrls: ['./add-material-dialog.component.css']
})
export class AddMaterialDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddMaterialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewMaterialDialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}
