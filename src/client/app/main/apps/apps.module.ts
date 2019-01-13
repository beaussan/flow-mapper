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
import { MatTableModule } from '@angular/material/table';
import { AppTechnoTabComponent } from './app-techno-tab/app-techno-tab.component';
import { AppsListTabComponent } from './apps-list-tab/apps-list-tab.component';
import { ConnectedGuard } from '../../common/connected.guard';

const routes = [
  {
    path: 'apps',
    component: AppsComponent,
    canActivate: [ConnectedGuard],
  },
];

@NgModule({
  declarations: [AppsComponent, AppTechnoTabComponent, AppsListTabComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    FuseSharedModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
  ],
  exports: [AppsComponent],
})
export class AppsModule {}
