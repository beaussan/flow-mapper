import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { SampleComponent } from './sample.component';
import { HelloComponent } from './hello/hello.component';

const routes = [
  {
    path: 'sample',
    component: SampleComponent,
  },
];

@NgModule({
  declarations: [SampleComponent, HelloComponent],
  imports: [RouterModule.forChild(routes), TranslateModule, FuseSharedModule],
  exports: [SampleComponent],
})
export class SampleModule {}
