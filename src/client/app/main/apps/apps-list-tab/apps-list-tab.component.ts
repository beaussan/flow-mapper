import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AppState } from '../../../state/app.state';
import { Observable } from 'rxjs';
import { App } from '../../../types/app';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from '../../../dialogs/delete-dialog/delete-dialog.component';
import { DeleteAppRequest } from '../../../state/app.actions';

@Component({
  selector: 'fl-apps-list-tab',
  templateUrl: './apps-list-tab.component.html',
  styleUrls: ['./apps-list-tab.component.scss'],
})
export class AppsListTabComponent implements OnInit {
  @Select(AppState.apps)
  apps$: Observable<App[]>;

  displayedColumns: string[] = ['name', 'description', 'actions'];
  constructor(public deleteDialog: MatDialog, public store: Store) {}

  ngOnInit() {}

  openDialog(app: App): void {
    const dialogRef = this.deleteDialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {
        id: app.id,
        name: app.name,
        type: 'app',
        deleteFunction: this.deleteApp.bind(this),
      },
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

  deleteApp(id: number) {
    this.store.dispatch(new DeleteAppRequest(id));
  }
}
