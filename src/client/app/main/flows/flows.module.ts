import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowsComponent } from './flows.component';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import {
  MatButtonModule,
  MatIconModule,
  MatTabsModule,
} from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { FlowTechnoTabComponent } from './flow-techno-tab/flow-techno-tab.component';
import { FlowsListTabComponent } from './flows-list-tab/flows-list-tab.component';
import { ConnectedGuard } from '../../common/connected.guard';

const routes = [
  {
    path: 'flows',
    component: FlowsComponent,
    canActivate: [ConnectedGuard],
  },
];

@NgModule({
  declarations: [FlowsComponent, FlowTechnoTabComponent, FlowsListTabComponent],
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
  exports: [FlowsComponent],
})
export class FlowsModule {}
