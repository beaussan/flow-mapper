import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { SampleComponent } from './sample.component';
import { HelloComponent } from './hello/hello.component';
import { ConnectedGuard } from '../../common/connected.guard';

const routes: Route[] = [
  {
    path: 'sample',
    component: SampleComponent,
    canActivate: [ConnectedGuard],
  },
];

@NgModule({
  declarations: [SampleComponent, HelloComponent],
  imports: [RouterModule.forChild(routes), TranslateModule, FuseSharedModule],
  exports: [SampleComponent],
})
export class SampleModule {}
