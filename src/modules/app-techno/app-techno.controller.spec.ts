import { Test, TestingModule } from '@nestjs/testing';
import { AppTechnoController } from './app-techno.controller';
import { AppTechnoService } from './app-techno.service';
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

describe('AppTechno Controller', () => {
  let module: TestingModule;
  let appTechnoController: AppTechnoController;
  let appTechnoService: MockService;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [AppTechnoController],
      providers: [
        {
          provide: AppTechnoService,
          useClass: MockService,
        },
      ],
    }).compile();

    appTechnoController = module.get(AppTechnoController);
    appTechnoService = module.get(AppTechnoService) as MockService;
  });

  it('should be defined', () => {
    const controller: AppTechnoController = module.get<AppTechnoController>(
      AppTechnoController,
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
      appTechnoService[check.serviceFunction].mockReturnValue(check.output);

      expect(
        await appTechnoController[check.controllerFunction](...check.input),
      ).toBe(check.output);

      expect(appTechnoService[check.serviceFunction]).toHaveBeenCalledTimes(1);
      const expectedInto = check.inputIntoFunction
        ? check.inputIntoFunction
        : check.input;
      expect(appTechnoService[check.serviceFunction]).toHaveBeenCalledWith(
        ...expectedInto,
      );
    });
  }

  it('should call the correct findOne function', async () => {
    const res = 'Tratata';
    const optional = Optional.of(res);
    const input = 3;
    appTechnoService.getOneById.mockReturnValue(optional);

    expect(await appTechnoController.findOne(input)).toBe(res);

    expect(appTechnoService.getOneById).toHaveBeenCalledTimes(1);
    expect(appTechnoService.getOneById).toHaveBeenCalledWith(input);
  });

  it('should call the correct findOne function and throw a 404 if none', async () => {
    const optional = Optional.empty();
    const input = 3;
    appTechnoService.getOneById.mockReturnValue(optional);

    const t = async () => {
      try {
        await appTechnoController.findOne(input);
        expect(true).toBe(false);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    };
    await t();

    expect(appTechnoService.getOneById).toHaveBeenCalledTimes(1);
    expect(appTechnoService.getOneById).toHaveBeenCalledWith(input);
  });
});
