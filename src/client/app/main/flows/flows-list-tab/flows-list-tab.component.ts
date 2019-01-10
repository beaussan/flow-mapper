import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { FlowState } from '../../../state/flow.state';
import { Observable } from 'rxjs';
import { Flow } from '../../../types/flow';

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

  constructor() {}

  ngOnInit() {}
}
