import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppsComponent } from './apps.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import {
  MatButtonModule,
  MatIconModule,
  MatTabsModule,
} from '@angular/material';

const routes = [
  {
    path: 'apps',
    component: AppsComponent,
  },
];

@NgModule({
  declarations: [AppsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    FuseSharedModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
  ],
  exports: [AppsComponent],
})
export class AppsModule {}
