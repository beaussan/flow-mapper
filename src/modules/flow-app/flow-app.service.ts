import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Client, Index } from 'algoliasearch';
import { InjectRepository } from '@nestjs/typeorm';
import { FlowAppRepository } from './flow-app.repository';
import { SEARCH_CLIENT_PROVIDER } from '../core/search/search.constants';
import { SEARCH_INDEX_NAME_FLOW_APPS } from './flow-app.constants';
import { FlowApp } from './flow-app.entity';
import { FlowAppDto } from './flow-app.dto';
import Optional from 'typescript-optional';
import { AppTechno } from '../app-techno/app-techno.entity';

@Injectable()
export class FlowAppService {
  private searchIndex: Index;

  constructor(
    @InjectRepository(FlowAppRepository)
    private readonly flowAppRepository: FlowAppRepository,
    @Inject(SEARCH_CLIENT_PROVIDER) private readonly searchClient: Client,
  ) {
    this.searchIndex = this.searchClient.initIndex(SEARCH_INDEX_NAME_FLOW_APPS);
  }

  async getAll(): Promise<FlowApp[]> {
    return this.flowAppRepository.find();
  }

  async getOneById(id: number): Promise<Optional<FlowApp>> {
    return this.flowAppRepository.findOneById(id);
  }

  async find(query: string): Promise<FlowApp[]> {
    const res = await this.searchIndex.search(query);
    return res.hits.map((data: any) => {
      const returned = new FlowApp();
      returned.id = data.objectID;
      returned.name = data.name;
      returned.description = data.description;
      return returned;
    });
  }

  async saveNewApp(app: FlowAppDto): Promise<FlowApp> {
    console.log('NEW APP', app);
    let appSaved = new FlowApp();
    appSaved.name = app.name;
    appSaved.description = app.description;
    appSaved.appTechnos = app.technos.map(techno => techno);

    appSaved = await this.flowAppRepository.save(appSaved);
    await this.searchIndex.addObject({
      objectID: appSaved.id,
      name: appSaved.name,
      description: appSaved.description,
      technos: appSaved.appTechnos,
    });
    return appSaved;
  }

  async update(id: number, body: FlowAppDto): Promise<FlowApp> {
    const appFound = (await this.flowAppRepository.findOneById(id)).orElseThrow(
      () => new NotFoundException(),
    );
    appFound.name = body.name;
    appFound.description = body.description;
    await this.flowAppRepository.save(appFound);
    await this.searchIndex.saveObject({
      objectId: `${appFound.id}`,
      name: body.name,
      description: body.description,
    });
    return appFound;
  }
}
