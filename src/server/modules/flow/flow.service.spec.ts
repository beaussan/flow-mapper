import { Test, TestingModule } from '@nestjs/testing';
import { FlowService } from './flow.service';
import { SEARCH_CLIENT_PROVIDER } from '../core/search/search.constants';
import { FlowAppService } from '../flow-app/flow-app.service';
import { FlowTechnoService } from '../flow-techno/flow-techno.service';

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

describe('FlowService', () => {
  let service: FlowService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlowService,
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
