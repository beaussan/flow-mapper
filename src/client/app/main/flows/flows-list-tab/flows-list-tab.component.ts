import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FlowState } from '../../../state/flow.state';
import { Observable } from 'rxjs';
import { Flow } from '../../../types/flow';
import { DeleteDialogComponent } from '../../../dialogs/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material';
import { DeleteFlowRequest } from '../../../state/flows.actions';

@Component({
  selector: 'fl-flows-list-tab',
  templateUrl: './flows-list-tab.component.html',
  styleUrls: ['./flows-list-tab.component.scss'],
})
export class FlowsListTabComponent implements OnInit {
  @Select(FlowState.flows)
  flows$: Observable<Flow[]>;

  displayedColumns: string[] = [
    'name',
    'source',
    'destination',
    'description',
    'actions',
  ];

  constructor(public deleteDialog: MatDialog, public store: Store) {}

  ngOnInit() {}

  openDialog(flow: Flow): void {
    const dialogRef = this.deleteDialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {
        id: flow.id,
        name: flow.name,
        type: 'flow-techno',
        deleteFunction: this.deleteFlow.bind(this),
      },
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

  deleteFlow(id: number) {
    this.store.dispatch(new DeleteFlowRequest(id));
  }
}
