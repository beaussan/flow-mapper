import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanEditFlowsDirective } from './can-edit-flows.directive';
import { CanEditAppsDirective } from './can-edit-apps.directive';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [CanEditFlowsDirective, CanEditAppsDirective],
  imports: [NgxsModule],
  exports: [CanEditFlowsDirective, CanEditAppsDirective],
})
export class HasUserRolesModule {}
