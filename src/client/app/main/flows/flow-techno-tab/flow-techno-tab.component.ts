import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { FlowTechnosState } from '../../../state/flow-technos.state';
import { Observable } from 'rxjs';
import { FlowTechno } from '../../../types/flow-technos';

@Component({
  selector: 'fl-flow-techno-tab',
  templateUrl: './flow-techno-tab.component.html',
  styleUrls: ['./flow-techno-tab.component.scss'],
})
export class FlowTechnoTabComponent implements OnInit {
  @Select(FlowTechnosState.flowTechnos)
  flowTechnos$: Observable<FlowTechno[]>;

  displayedColumns: string[] = ['name', 'actions'];

  constructor() {}

  ngOnInit() {}
}
