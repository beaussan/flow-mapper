import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

import { locale as english } from './i18n/en';
import { locale as french } from './i18n/fr';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { FetchAllFlowTechnosRequest } from '../../state/flow-technos.actions';
import { FetchAllFlowsRequest } from '../../state/flows.actions';
import { FetchAllAppRequest } from '../../state/app.actions';

@Component({
  selector: 'fl-flows',
  templateUrl: './flows.component.html',
  styleUrls: ['./flows.component.scss'],
})
export class FlowsComponent implements OnInit {
  constructor(
    private fuseTranslationLoaderService: FuseTranslationLoaderService,
    private store: Store,
  ) {
    this.fuseTranslationLoaderService.loadTranslations(english, french);
    this.store.dispatch(new FetchAllFlowTechnosRequest());
    this.store.dispatch(new FetchAllFlowsRequest());
    this.store.dispatch(new FetchAllAppRequest());
  }

  ngOnInit() {}
}
