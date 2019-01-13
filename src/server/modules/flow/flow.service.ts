import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client, Index } from 'algoliasearch';
import { SEARCH_CLIENT_PROVIDER } from '../core/search/search.constants';
import { FlowAppService } from '../flow-app/flow-app.service';
import { FlowTechnoService } from '../flow-techno/flow-techno.service';
import { SEARCH_INDEX_NAME } from './flow.constants';
import { Flow } from './flow.entity';
import { FlowRepository } from './flow.repository';
import { FlowDtoInput, FLowDtoOutput } from './flow.dto';
import { FlowTechnoOrder } from './flow-techno-order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FlowService {
  private searchIndex: Index;

  constructor(
    @InjectRepository(FlowRepository)
    private readonly flowRepository: FlowRepository,
    @InjectRepository(FlowTechnoOrder)
    private readonly flowTechnoOrderRepository: Repository<FlowTechnoOrder>,
    @Inject(SEARCH_CLIENT_PROVIDER) private readonly searchClient: Client,
    private readonly flowAppService: FlowAppService,
    private readonly flowTechnoService: FlowTechnoService,
  ) {
    this.searchIndex = this.searchClient.initIndex(SEARCH_INDEX_NAME);
  }

  async getAll(): Promise<Flow[]> {
    return this.flowRepository.findAllWithRelations();
  }

  async getAllWithDto(): Promise<FLowDtoOutput[]> {
    return (await this.flowRepository.findAllWithRelations()).map(flow =>
      this.transformFlowInFlowDTO(flow),
    );
  }

  async saveNewFlow(flowDto: FlowDtoInput): Promise<FLowDtoOutput> {
    const flow = new Flow();

    const technos = await Promise.all(
      flowDto.flowTechnos.map(techno =>
        this.flowTechnoService.saveNewTechno(techno),
      ),
    );

    flow.name = flowDto.name;
    flow.description = flowDto.description;
    flow.sourceApp = (await this.flowAppService.getOneById(
      flowDto.sourceAppId,
    )).orElseThrow(() => new BadRequestException());
    flow.destApp = (await this.flowAppService.getOneById(
      flowDto.destinationAppId,
    )).orElseThrow(() => new BadRequestException());

    const flowSaved = await this.flowRepository.save(flow);

    flowSaved.flowTechnos = technos.map((techno, i) => {
      const flowTechnoOrder = new FlowTechnoOrder();
      flowTechnoOrder.flow = flowSaved;
      flowTechnoOrder.position = i;
      flowTechnoOrder.techno = techno;

      this.flowTechnoOrderRepository.save(flowTechnoOrder);

      return flowTechnoOrder;
    });

    const newFlow = await this.flowRepository.save(flowSaved);

    return this.transformFlowInFlowDTO(newFlow);
  }

  transformFlowInFlowDTO(flow: Flow): FLowDtoOutput {
    const output = new FLowDtoOutput();

    output.id = flow.id;
    output.description = flow.description;
    output.name = flow.name;
    output.destinationApp = flow.destApp;
    output.sourceApp = flow.sourceApp;
    output.flowTechnos = flow.flowTechnos.map(
      technoOrder => technoOrder.techno,
    );

    return output;
  }
}
