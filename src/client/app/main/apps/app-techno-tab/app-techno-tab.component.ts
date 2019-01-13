import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AppTechnosState } from '../../../state/app-technos.state';
import { AppTechno } from '../../../types/app-technos';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from '../../../dialogs/delete-dialog/delete-dialog.component';
import {
  CreateAppTechnoRequest,
  DeleteAppTechnoRequest,
} from '../../../state/app-technos.actions';
import { CreateTechnoDialogComponent } from '../../../dialogs/create-techno-dialog/create-techno-dialog.component';
import { CreateFlowTechnoRequest } from '../../../state/flow-technos.actions';

@Component({
  selector: 'fl-app-techno-tab',
  templateUrl: './app-techno-tab.component.html',
  styleUrls: ['./app-techno-tab.component.scss'],
})
export class AppTechnoTabComponent implements OnInit {
  @Select(AppTechnosState.appTechnos)
  appTechnos$: Observable<AppTechno[]>;

  displayedColumns: string[] = ['name', 'actions'];

  newTechno: string;

  constructor(public dialog: MatDialog, public store: Store) {}

  ngOnInit() {}

  openDeleteDialog(appTechno: AppTechno): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {
        id: appTechno.id,
        name: appTechno.name,
        type: 'flow-techno',
        deleteFunction: this.deleteAppTechno.bind(this),
      },
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateTechnoDialogComponent, {
      width: '250px',
      data: {
        name: this.newTechno,
      },
    });

    dialogRef
      .afterClosed()
      .subscribe(result =>
        this.store.dispatch(new CreateAppTechnoRequest(result)),
      );
  }

  deleteAppTechno(id: number) {
    this.store.dispatch(new DeleteAppTechnoRequest(id));
  }
}
