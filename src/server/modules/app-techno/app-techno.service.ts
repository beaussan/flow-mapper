import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppTechnoRepository } from './app-techno.repository';
import { SEARCH_CLIENT_PROVIDER } from '../core/search/search.constants';
import { Client, Index } from 'algoliasearch';
import { SEARCH_INDEX_NAME } from './app-techno.constants';
import { AppTechno } from './app-techno.entity';
import Optional from 'typescript-optional';

@Injectable()
export class AppTechnoService {
  private searchIndex: Index;

  constructor(
    @InjectRepository(AppTechnoRepository)
    private readonly appTechRepository: AppTechnoRepository,
    @Inject(SEARCH_CLIENT_PROVIDER) private readonly searchClient: Client,
  ) {
    this.searchIndex = this.searchClient.initIndex(SEARCH_INDEX_NAME);
    /*
    this.searchIndex.setSettings({
      searchableAttributes: ['name'],
    });
    */
  }

  async saveNewTechno(name: string): Promise<AppTechno> {
    const maybeTechno = await this.appTechRepository.findOneWithNameIgnoringCase(
      name,
    );
    if (maybeTechno.isPresent) {
      return maybeTechno.get();
    } else {
      let appTechno = new AppTechno();
      appTechno.name = name;
      appTechno = await this.appTechRepository.save(appTechno);
      await this.searchIndex.addObject({
        objectID: appTechno.id,
        name: appTechno.name,
      });
      return appTechno;
    }
  }

  async getAll(): Promise<AppTechno[]> {
    return this.appTechRepository.find();
  }

  async getOneById(id: number): Promise<Optional<AppTechno>> {
    return this.appTechRepository.findOneById(id);
  }

  async find(query: string): Promise<AppTechno[]> {
    const res = await this.searchIndex.search(query);
    return res.hits.map((data: any) => {
      const returned = new AppTechno();
      returned.id = data.objectID;
      returned.name = data.name;
      return returned;
    });
  }

  async updateName(id: number, newName: string): Promise<AppTechno> {
    const technoFound = (await this.appTechRepository.findOneById(
      id,
    )).orElseThrow(() => new NotFoundException());
    technoFound.name = newName;
    await this.appTechRepository.save(technoFound);
    await this.searchIndex.saveObject({
      objectID: `${technoFound.id}`,
      name: newName,
    });
    return technoFound;
  }

  async deleteById(id: number): Promise<void> {
    const technoFound = (await this.appTechRepository.findOneById(
      id,
    )).orElseThrow(() => new NotFoundException());
    await this.appTechRepository.remove(technoFound);
    await this.searchIndex.deleteObject(`${id}`);
  }
}
