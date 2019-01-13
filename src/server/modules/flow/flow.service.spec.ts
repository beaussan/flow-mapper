import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FlowService } from './flow.service';
import { SEARCH_CLIENT_PROVIDER } from '../core/search/search.constants';
import { FlowAppService } from '../flow-app/flow-app.service';
import { FlowTechnoService } from '../flow-techno/flow-techno.service';
import { FlowRepository } from './flow.repository';
import { FlowTechnoOrder } from './flow-techno-order.entity';

class FakeSearchRepo {
  public current: FakeSearchIndex;

  public initIndex(str: string): FakeSearchIndex {
    this.current = new FakeSearchIndex();
    return this.current;
  }
}

class FakeSearchIndex {
  addObject = jest.fn();
  search = jest.fn();
  saveObject = jest.fn();
  deleteObject = jest.fn();
}

class FakeFlowAppService {}
class FakeFlowTechnoService {}
class FakeFlowRepository {
  findOneWithNameIgnoringCase = jest.fn();
  save = jest.fn();
  findOneById = jest.fn();
  find = jest.fn();
  remove = jest.fn();
}

class FakeFlowTechnoOrderRepository {
  findOneWithNameIgnoringCase = jest.fn();
  save = jest.fn();
  findOneById = jest.fn();
  find = jest.fn();
  remove = jest.fn();
}

describe('FlowService', () => {
  let service: FlowService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlowService,
        {
          provide: getRepositoryToken(FlowRepository),
          useClass: FakeFlowRepository,
        },
        {
          provide: getRepositoryToken(FlowTechnoOrder),
          useClass: FakeFlowTechnoOrderRepository,
        },
        {
          provide: SEARCH_CLIENT_PROVIDER,
          useClass: FakeSearchRepo,
        },
        {
          provide: FlowAppService,
          useClass: FakeFlowAppService,
        },
        {
          provide: FlowTechnoService,
          useClass: FakeFlowTechnoService,
        },
      ],
    }).compile();
    service = module.get<FlowService>(FlowService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
