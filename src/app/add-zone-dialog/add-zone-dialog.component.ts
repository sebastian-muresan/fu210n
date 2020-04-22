import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewZoneDialogData } from '../DataTypes/data.types';
@Component({
  selector: 'app-add-zone-dialog',
  templateUrl: './add-zone-dialog.component.html',
  styleUrls: ['./add-zone-dialog.component.css']
})

export class AddZoneDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddZoneDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewZoneDialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}
