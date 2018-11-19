import { Inject, Injectable } from '@nestjs/common';
import { Client, Index } from 'algoliasearch';
import { SEARCH_CLIENT_PROVIDER } from '../core/search/search.constants';
import { FlowAppService } from '../flow-app/flow-app.service';
import { FlowTechnoService } from '../flow-techno/flow-techno.service';

@Injectable()
export class FlowService {
  private searchIndex: Index;

  constructor(
    @Inject(SEARCH_CLIENT_PROVIDER) private readonly searchClient: Client,
    private readonly flowAppService: FlowAppService,
    private readonly flowTechnoService: FlowTechnoService,
  ) {}
}
