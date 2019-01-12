import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface CreateTechnoDialogData {
  name: string;
}

@Component({
  selector: 'fl-create-techno-dialog',
  templateUrl: './create-techno-dialog.component.html',
  styleUrls: ['./create-techno-dialog.component.scss'],
})
export class CreateTechnoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateTechnoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateTechnoDialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
