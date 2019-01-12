import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AppTechnosState } from '../../../state/app-technos.state';
import { AppTechno } from '../../../types/app-technos';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from '../../../dialogs/delete-dialog/delete-dialog.component';
import { DeleteAppTechnoRequest } from '../../../state/app-technos.actions';

@Component({
  selector: 'fl-app-techno-tab',
  templateUrl: './app-techno-tab.component.html',
  styleUrls: ['./app-techno-tab.component.scss'],
})
export class AppTechnoTabComponent implements OnInit {
  @Select(AppTechnosState.appTechnos)
  appTechnos$: Observable<AppTechno[]>;

  displayedColumns: string[] = ['name', 'actions'];

  constructor(public deleteDialog: MatDialog, public store: Store) {}

  ngOnInit() {}

  openDialog(appTechno: AppTechno): void {
    const dialogRef = this.deleteDialog.open(DeleteDialogComponent, {
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

  deleteAppTechno(id: number) {
    this.store.dispatch(new DeleteAppTechnoRequest(id));
  }
}
