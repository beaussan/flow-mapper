import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FuseDirectivesModule } from '@fuse/directives/directives';
import { FusePipesModule } from '@fuse/pipes/pipes.module';
import { HasUserRolesModule } from '../app/common/directives/has-user-roles/has-user-roles.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    FlexLayoutModule,

    FuseDirectivesModule,
    FusePipesModule,
    HasUserRolesModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    FlexLayoutModule,

    FuseDirectivesModule,
    FusePipesModule,
    HasUserRolesModule,
  ],
})
export class FuseSharedModule {}
