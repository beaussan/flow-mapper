import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { MatDialog } from '@angular/material';

import { FlowTechnosState } from '../../../state/flow-technos.state';
import { Observable } from 'rxjs';
import { FlowTechno } from '../../../types/flow-technos';
import { DeleteDialogComponent } from '../../../dialogs/delete-dialog/delete-dialog.component';
import { DeleteFlowTechnoRequest } from '../../../state/flow-technos.actions';

@Component({
  selector: 'fl-flow-techno-tab',
  templateUrl: './flow-techno-tab.component.html',
  styleUrls: ['./flow-techno-tab.component.scss'],
})
export class FlowTechnoTabComponent implements OnInit {
  @Select(FlowTechnosState.flowTechnos)
  flowTechnos$: Observable<FlowTechno[]>;

  displayedColumns: string[] = ['name', 'actions'];

  constructor(public deleteDialog: MatDialog, public store: Store) {}

  ngOnInit() {}

  openDialog(flowTechno: FlowTechno): void {
    const dialogRef = this.deleteDialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {
        id: flowTechno.id,
        name: flowTechno.name,
        type: 'flow-techno',
        deleteFunction: this.deleteFlowTechno.bind(this),
      },
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

  deleteFlowTechno(id: number) {
    this.store.dispatch(new DeleteFlowTechnoRequest(id));
  }
}
