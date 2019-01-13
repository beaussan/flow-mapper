import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FuseTranslationLoaderService } from '../../../@fuse/services/translation-loader.service';
import { locale as english } from './i18n/en';
import { locale as french } from './i18n/fr';

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
    private fuseTranslationLoaderService: FuseTranslationLoaderService,
    @Inject(MAT_DIALOG_DATA) public data: CreateTechnoDialogData,
  ) {
    this.fuseTranslationLoaderService.loadTranslations(english, french);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
