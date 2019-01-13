import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FlowState } from '../../../state/flow.state';
import { Observable } from 'rxjs';
import { Flow } from '../../../types/flow';
import { DeleteDialogComponent } from '../../../dialogs/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material';
import {
  CreateFlowRequest,
  DeleteFlowRequest,
} from '../../../state/flows.actions';
import { CreateTechnoDialogComponent } from '../../../dialogs/create-techno-dialog/create-techno-dialog.component';
import { CreateFlowTechnoRequest } from '../../../state/flow-technos.actions';
import { CreateFlowDialogComponent } from '../../../dialogs/create-flow-dialog/create-flow-dialog.component';

@Component({
  selector: 'fl-flows-list-tab',
  templateUrl: './flows-list-tab.component.html',
  styleUrls: ['./flows-list-tab.component.scss'],
})
export class FlowsListTabComponent implements OnInit {
  newFlowName: string;
  newFlowDescription: string;
  newFlowSourceAppId: number;
  newFlowDestinationAppId: number;
  newFlowTechnos: string[];

  @Select(FlowState.flows)
  flows$: Observable<Flow[]>;

  displayedColumns: string[] = [
    'name',
    'source',
    'destination',
    'description',
    'actions',
  ];

  constructor(public dialog: MatDialog, public store: Store) {}

  ngOnInit() {}

  openDialog(flow: Flow): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
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

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateFlowDialogComponent, {
      width: '400px',
      data: {
        name: this.newFlowName,
        description: this.newFlowDescription,
        sourceAppId: this.newFlowSourceAppId,
        destinationAppId: this.newFlowDestinationAppId,
        flowTechnos: this.newFlowTechnos,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      const {
        name,
        description,
        sourceAppId,
        destinationAppId,
        flowTechnos,
      } = result;
      this.store.dispatch(
        new CreateFlowRequest(
          name,
          description,
          sourceAppId,
          destinationAppId,
          flowTechnos,
        ),
      );
    });
  }

  deleteFlow(id: number) {
    this.store.dispatch(new DeleteFlowRequest(id));
  }
}
