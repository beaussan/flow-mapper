import { Component, OnInit } from '@angular/core';
import * as shape from 'd3-shape';
import { Select, Store } from '@ngxs/store';
import { FlowState } from '../../state/flow.state';
import { Observable } from 'rxjs';
import { FetchAllFlowsRequest } from '../../state/flows.actions';

@Component({
  selector: 'fl-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit {
  curve: any = shape.curveLinear;
  view: any[];
  autoZoom = true;
  panOnZoom = true;
  enableZoom = true;
  autoCenter = false;
  showLegend = false;
  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  @Select(FlowState.formattedFlowsForGrah)
  formattedFlowsForGrah$: Observable<any>;

  constructor(private store: Store) {
    this.store.dispatch(new FetchAllFlowsRequest());
  }

  ngOnInit() {}

  clickOnNode(event) {
    console.log('GRAPH : ', event);
  }
}
