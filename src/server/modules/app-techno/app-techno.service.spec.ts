import { Test, TestingModule } from '@nestjs/testing';
import { AppTechnoService } from './app-techno.service';
import { AppTechnoRepository } from './app-techno.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SEARCH_CLIENT_PROVIDER } from '../core/search/search.constants';
import { AppTechnoController } from './app-techno.controller';
import Optional from 'typescript-optional';
import { AppTechno } from './app-techno.entity';
import { NotFoundException } from '@nestjs/common';

class FakeAppTechnoRepository {
  findOneWithNameIgnoringCase = jest.fn();
  save = jest.fn();
  findOneById = jest.fn();
  find = jest.fn();
  remove = jest.fn();
}

class FakeSearchRepo {
  public current: FakeSearchIndex;

  public initIndex(str: string) {
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

describe('AppTechnoService', () => {
  let service: AppTechnoService;
  let fakeSearchIndex: FakeSearchIndex;
  let fakeRepo: FakeAppTechnoRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppTechnoService,
        {
          provide: getRepositoryToken(AppTechnoRepository),
          useClass: FakeAppTechnoRepository,
        },
        {
          provide: SEARCH_CLIENT_PROVIDER,
          useClass: FakeSearchRepo,
        },
      ],
    }).compile();
    service = module.get<AppTechnoService>(AppTechnoService);
    fakeSearchIndex = module.get(SEARCH_CLIENT_PROVIDER)
      .current as FakeSearchIndex;
    fakeRepo = module.get(
      getRepositoryToken(AppTechnoRepository),
    ) as FakeAppTechnoRepository;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(fakeRepo).toBeDefined();
    expect(fakeSearchIndex).toBeDefined();
  });

  describe('saveNewTechno', () => {
    it('should not save a techno if one is present', async () => {
      const tech = new AppTechno();
      tech.id = 10;
      tech.name = 'taratata';
      fakeRepo.findOneWithNameIgnoringCase.mockReturnValue(Optional.of(tech));

      const result = await service.saveNewTechno(tech.name);

      expect(result).toBe(tech);
      expect(fakeRepo.findOneWithNameIgnoringCase).toHaveBeenCalledTimes(1);
      expect(fakeRepo.findOneWithNameIgnoringCase).toHaveBeenCalledWith(
        tech.name,
      );
    });

    it('should save a techno if none is present', async () => {
      const tech = new AppTechno();
      tech.id = 10;
      tech.name = 'taratata';
      fakeRepo.findOneWithNameIgnoringCase.mockReturnValue(Optional.empty());
      fakeRepo.save.mockReturnValue(tech);
      fakeSearchIndex.addObject.mockReturnValue(undefined);

      const result = await service.saveNewTechno(tech.name);

      expect(result).toBe(tech);
      expect(fakeRepo.findOneWithNameIgnoringCase).toHaveBeenCalledTimes(1);
      expect(fakeRepo.findOneWithNameIgnoringCase).toHaveBeenCalledWith(
        tech.name,
      );
      expect(fakeRepo.save).toHaveBeenCalledTimes(1);
      const made = new AppTechno();
      made.name = tech.name;
      expect(fakeRepo.save).toHaveBeenCalledWith(made);
      expect(fakeSearchIndex.addObject).toHaveBeenCalledTimes(1);
      expect(fakeSearchIndex.addObject).toHaveBeenCalledWith({
        objectID: tech.id,
        name: tech.name,
      });
    });
  });

  describe('getAll', () => {
    it('should call the correct function', async () => {
      const ret = ['tara', 't', 'ff', 'afa'];
      fakeRepo.find.mockReturnValue(ret);

      const result = await service.getAll();

      expect(result).toBe(ret);
      expect(fakeRepo.find).toHaveBeenCalledWith();
      expect(fakeRepo.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOneById', () => {
    it('should call the correct function', async () => {
      const ret = Optional.of({ data: 'toto' });
      const idLooking = 1;
      fakeRepo.findOneById.mockReturnValue(ret);

      const result = await service.getOneById(idLooking);

      expect(result).toBe(ret);
      expect(fakeRepo.findOneById).toHaveBeenCalledWith(idLooking);
      expect(fakeRepo.findOneById).toHaveBeenCalledTimes(1);
    });
  });

  describe('find', () => {
    it('should call the correct function', async () => {
      const ret = { hits: [] };
      const query = 'taratofo';
      fakeSearchIndex.search.mockReturnValue(ret);

      const result = await service.find(query);

      expect(result).toEqual(ret.hits);
      expect(fakeSearchIndex.search).toHaveBeenCalledWith(query);
      expect(fakeSearchIndex.search).toHaveBeenCalledTimes(1);
    });

    it('should transform into the correct data form', async () => {
      const tech = new AppTechno();
      tech.id = 10;
      tech.name = 'taratata';
      const ret = { hits: [{ objectID: tech.id, name: tech.name }] };
      const query = 'taratofo';
      fakeSearchIndex.search.mockReturnValue(ret);

      const result = await service.find(query);

      expect(result).toEqual([tech]);
      expect(fakeSearchIndex.search).toHaveBeenCalledWith(query);
      expect(fakeSearchIndex.search).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateName', () => {
    it('should throw a 404 if the id is not found', async () => {
      const ret = Optional.empty();
      const idLooking = 1;
      const newName = 'taratata';
      fakeRepo.findOneById.mockReturnValue(ret);

      const t = async () => {
        try {
          await service.updateName(idLooking, newName);
          expect(true).toBe(false);
        } catch (e) {
          expect(e).toBeInstanceOf(NotFoundException);
        }
      };
      await t();

      expect(fakeRepo.findOneById).toHaveBeenCalledWith(idLooking);
      expect(fakeRepo.findOneById).toHaveBeenCalledTimes(1);
    });

    it('should call the corect methods', async () => {
      const idLooking = 1;
      const newName = 'taratatatataatatat';
      const techSend = new AppTechno();
      techSend.id = idLooking;
      techSend.name = 'taratata';
      const ret = Optional.of(techSend);
      fakeRepo.findOneById.mockReturnValue(ret);

      const result = await service.updateName(idLooking, newName);

      expect(result.name).toEqual(newName);
      expect(fakeRepo.findOneById).toHaveBeenCalledWith(idLooking);
      expect(fakeRepo.findOneById).toHaveBeenCalledTimes(1);
      expect(fakeRepo.save).toHaveBeenCalledWith(techSend);
      expect(fakeRepo.save).toHaveReturnedTimes(1);
      expect(fakeSearchIndex.saveObject).toHaveBeenCalledWith({
        objectID: `${idLooking}`,
        name: newName,
      });
      expect(fakeSearchIndex.saveObject).toHaveReturnedTimes(1);
    });
  });
  describe('deleteById', () => {
    it('should throw a 404 if the id is not found', async () => {
      const ret = Optional.empty();
      const idLooking = 1;
      fakeRepo.findOneById.mockReturnValue(ret);

      const t = async () => {
        try {
          await service.deleteById(idLooking);
          expect(true).toBe(false);
        } catch (e) {
          expect(e).toBeInstanceOf(NotFoundException);
        }
      };
      await t();

      expect(fakeRepo.findOneById).toHaveBeenCalledWith(idLooking);
      expect(fakeRepo.findOneById).toHaveBeenCalledTimes(1);
    });

    it('should call the corect methods', async () => {
      const idLooking = 1;
      const techSend = new AppTechno();
      techSend.id = idLooking;
      techSend.name = 'taratata';
      const ret = Optional.of(techSend);
      fakeRepo.findOneById.mockReturnValue(ret);

      await service.deleteById(idLooking);

      expect(fakeRepo.findOneById).toHaveBeenCalledWith(idLooking);
      expect(fakeRepo.findOneById).toHaveBeenCalledTimes(1);
      expect(fakeRepo.remove).toHaveBeenCalledWith(techSend);
      expect(fakeRepo.remove).toHaveReturnedTimes(1);
      expect(fakeSearchIndex.deleteObject).toHaveBeenCalledWith(`${idLooking}`);
      expect(fakeSearchIndex.deleteObject).toHaveReturnedTimes(1);
    });
  });
});
