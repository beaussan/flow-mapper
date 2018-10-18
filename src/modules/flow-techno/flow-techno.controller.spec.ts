import { Test, TestingModule } from '@nestjs/testing';
import { FlowTechnoController } from './flow-techno.controller';
import { FlowTechnoService } from './flow-techno.service';
import Optional from 'typescript-optional';
import { NotFoundException } from '@nestjs/common';

class MockService {
  getAll = jest.fn();
  saveNewTechno = jest.fn();
  find = jest.fn();
  getOneById = jest.fn();
  updateName = jest.fn();
  deleteById = jest.fn();
}

describe('FlowTechno Controller', () => {
  let module: TestingModule;
  let flowTechnoController: FlowTechnoController;
  let flowTechnoService: MockService;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [FlowTechnoController],
      providers: [
        {
          provide: FlowTechnoService,
          useClass: MockService,
        },
      ],
    }).compile();

    flowTechnoController = module.get(FlowTechnoController);
    flowTechnoService = module.get(FlowTechnoService) as MockService;
  });

  it('should be defined', () => {
    const controller: FlowTechnoController = module.get<FlowTechnoController>(
      FlowTechnoController,
    );
    expect(controller).toBeDefined();
  });

  const checks = [
    {
      controllerFunction: 'getAll',
      serviceFunction: 'getAll',
      input: [],
      output: ['taratat'],
    },
    {
      controllerFunction: 'saveNew',
      serviceFunction: 'saveNewTechno',
      input: [{ name: 'toto' }],
      inputIntoFunction: ['toto'],
      output: ['taratat'],
    },
    {
      controllerFunction: 'search',
      serviceFunction: 'find',
      input: ['toto'],
      output: ['taratat'],
    },
    {
      controllerFunction: 'search',
      serviceFunction: 'find',
      input: ['toto'],
      output: ['taratat'],
    },
    {
      controllerFunction: 'updateOne',
      serviceFunction: 'updateName',
      input: [1, { name: 'tata' }],
      inputIntoFunction: [1, 'tata'],
      output: ['taratat'],
    },
    {
      controllerFunction: 'deleteOne',
      serviceFunction: 'deleteById',
      input: [1],
      inputIntoFunction: [1],
      output: undefined,
    },
  ];

  for (const check of checks) {
    it(`should call ${check.controllerFunction} correctly`, async () => {
      flowTechnoService[check.serviceFunction].mockReturnValue(check.output);

      expect(
        await flowTechnoController[check.controllerFunction](...check.input),
      ).toBe(check.output);

      expect(flowTechnoService[check.serviceFunction]).toHaveBeenCalledTimes(1);
      const expectedInto = check.inputIntoFunction
        ? check.inputIntoFunction
        : check.input;
      expect(flowTechnoService[check.serviceFunction]).toHaveBeenCalledWith(
        ...expectedInto,
      );
    });
  }

  it('should call the correct findOne function', async () => {
    const res = 'Tratata';
    const optional = Optional.of(res);
    const input = 3;
    flowTechnoService.getOneById.mockReturnValue(optional);

    expect(await flowTechnoController.findOne(input)).toBe(res);

    expect(flowTechnoService.getOneById).toHaveBeenCalledTimes(1);
    expect(flowTechnoService.getOneById).toHaveBeenCalledWith(input);
  });

  it('should call the correct findOne function and throw a 404 if none', async () => {
    const optional = Optional.empty();
    const input = 3;
    flowTechnoService.getOneById.mockReturnValue(optional);

    const t = async () => {
      try {
        await flowTechnoController.findOne(input);
        expect(true).toBe(false);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    };
    await t();

    expect(flowTechnoService.getOneById).toHaveBeenCalledTimes(1);
    expect(flowTechnoService.getOneById).toHaveBeenCalledWith(input);
  });
});
