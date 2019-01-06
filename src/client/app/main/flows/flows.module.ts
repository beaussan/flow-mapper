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
import { TranslateModule } from '@ngx-translate/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxGraphModule } from '@swimlane/ngx-graph';

const routes = [
  {
    path: 'flows',
    component: FlowsComponent,
  },
];

@NgModule({
  declarations: [FlowsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    FuseSharedModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,

    // Ngx Graph
    NgxChartsModule,
    NgxGraphModule,
  ],
  exports: [FlowsComponent],
})
export class FlowsModule {}
