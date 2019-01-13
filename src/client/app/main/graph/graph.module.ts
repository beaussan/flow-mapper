import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphComponent } from './graph.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ConnectedGuard } from '../../common/connected.guard';

const routes = [
  {
    path: 'graph',
    component: GraphComponent,
    canActivate: [ConnectedGuard],
  },
];

@NgModule({
  declarations: [GraphComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,

    // Ngx Graph
    NgxChartsModule,
    NgxGraphModule,
  ],
})
export class GraphModule {}
