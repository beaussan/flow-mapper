import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule,
} from '@angular/material';

import {
  FuseSearchBarModule,
  FuseShortcutsModule,
} from '../../../../@fuse/components/index';
import { FuseSharedModule } from '@fuse/shared.module';

import { ToolbarComponent } from 'app/layout/components/toolbar/toolbar.component';
import { IsAuthEnabledModule } from '../../../common/is-auth-enabled/is-auth-enabled.module';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,

    IsAuthEnabledModule,

    FuseSharedModule,
    FuseSearchBarModule,
    FuseShortcutsModule,
  ],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
