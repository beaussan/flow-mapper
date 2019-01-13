import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { UsersState } from './state/users.state';
import { UsersService } from './services/users.service';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatTableModule,
} from '@angular/material';
import { UserCreateModalComponent } from './user-create-modal/user-create-modal.component';

const routes = [
  {
    path: 'users',
    component: UsersComponent,
  },
];

@NgModule({
  declarations: [UsersComponent, UserCreateModalComponent],
  imports: [
    RouterModule.forChild(routes),
    NgxsModule.forFeature([UsersState]),

    FuseSharedModule,

    MatProgressSpinnerModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
  ],
  providers: [UsersService],
  entryComponents: [UserCreateModalComponent],
})
export class UsersModule {}
