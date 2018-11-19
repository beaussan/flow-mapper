import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client, Index } from 'algoliasearch';
import { SEARCH_CLIENT_PROVIDER } from '../core/search/search.constants';
import { FlowAppService } from '../flow-app/flow-app.service';
import { FlowTechnoService } from '../flow-techno/flow-techno.service';
import { SEARCH_INDEX_NAME } from './flow.constants';
import { Flow } from './flow.entity';
import { FlowRepository } from './flow.repository';
import { FlowDto } from './flow.dto';

@Injectable()
export class FlowService {
  private searchIndex: Index;

  constructor(
    @InjectRepository(FlowRepository)
    private readonly flowRepository: FlowRepository,
    @Inject(SEARCH_CLIENT_PROVIDER) private readonly searchClient: Client,
    private readonly flowAppService: FlowAppService,
    private readonly flowTechnoService: FlowTechnoService,
  ) {
    this.searchIndex = this.searchClient.initIndex(SEARCH_INDEX_NAME);
  }

  async getAll(): Promise<Flow[]> {
    return this.flowRepository.find();
  }

  // TODO : Rework this part + change DTO :)
  async saveNewFlow(flowDto: FlowDto): Promise<Flow> {
    const flow = new Flow();
    flow.name = flowDto.name;
    flow.description = flowDto.description;
    flow.sourceApp = flowDto.sourceApp;
    flow.destApp = flowDto.destinationApp;
    flow.flowTechnos = flowDto.flowTechnos;
    return this.flowRepository.save(flow);
  }
}
