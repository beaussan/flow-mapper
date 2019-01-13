import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { locale as english } from './i18n/en';
import { locale as french } from './i18n/fr';
import { FuseTranslationLoaderService } from '../../../@fuse/services/translation-loader.service';

export interface DeleteDialogData {
  id: number;
  name: string;
  type: string;
  deleteFunction: (id: number) => void;
}
@Component({
  selector: 'fl-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent {
  param: object = {
    name: this.data.name,
    type: this.data.type,
  };
  constructor(
    private fuseTranslationLoaderService: FuseTranslationLoaderService,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData,
  ) {
    this.fuseTranslationLoaderService.loadTranslations(english, french);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
