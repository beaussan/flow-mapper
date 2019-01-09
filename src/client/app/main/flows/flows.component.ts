import { Component, OnInit } from '@angular/core';
import * as shape from 'd3-shape';
import { Select, Store } from '@ngxs/store';

import { locale as english } from './i18n/en';
import { locale as french } from './i18n/fr';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { FetchAllFlowTechnosRequest } from '../../state/flow-technos.actions';
import { FlowTechnosState } from '../../state/flow-technos.state';
import { Observable } from 'rxjs';
import { FlowTechno } from '../../types/flow-technos';
import { FetchAllFlowsRequest } from '../../state/flows.actions';
import { FlowState } from '../../state/flow.state';
import { Flow } from '../../types/flow';
@Component({
  selector: 'fl-flows',
  templateUrl: './flows.component.html',
  styleUrls: ['./flows.component.scss'],
})
export class FlowsComponent implements OnInit {
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

  @Select(FlowTechnosState.flowTechnos)
  flowTechnos$: Observable<FlowTechno[]>;

  @Select(FlowState.formattedFlowsForGrah)
  formattedFlowsForGrah$: Observable<any>;

  @Select(FlowState.flows)
  flows$: Observable<Flow[]>;

  constructor(
    private fuseTranslationLoaderService: FuseTranslationLoaderService,
    private store: Store,
  ) {
    this.fuseTranslationLoaderService.loadTranslations(english, french);
    this.store.dispatch(new FetchAllFlowTechnosRequest());
    this.store.dispatch(new FetchAllFlowsRequest());
  }

  ngOnInit() {}

  clickOnNode(event) {
    console.log(event);
  }
}
