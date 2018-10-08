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
import { AppTechnoService } from '../app-techno/app-techno.service';

@Injectable()
export class FlowAppService {
  private searchIndex: Index;

  constructor(
    @InjectRepository(FlowAppRepository)
    private readonly flowAppRepository: FlowAppRepository,
    @Inject(SEARCH_CLIENT_PROVIDER) private readonly searchClient: Client,
    private readonly appTechnoSerice: AppTechnoService,
  ) {
    this.searchIndex = this.searchClient.initIndex(SEARCH_INDEX_NAME_FLOW_APPS);
  }

  async getAll(): Promise<FlowApp[]> {
    return this.flowAppRepository.find({ relations: ['appTechnos'] });
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
    let appSaved = new FlowApp();
    appSaved.name = app.name;
    appSaved.description = app.description;

    const technoPromises = app.technos.map(name =>
      this.appTechnoSerice.saveNewTechno(name),
    );
    appSaved.appTechnos = await Promise.all(technoPromises);

    appSaved = await this.flowAppRepository.save(appSaved);
    await this.searchIndex.addObject({
      objectID: appSaved.id,
      name: appSaved.name,
      description: appSaved.description,
      technos: appSaved.appTechnos.map(techno => techno.name),
    });
    return appSaved;
  }

  async update(id: number, body: FlowAppDto): Promise<FlowApp> {
    const appFound = (await this.flowAppRepository.findOneById(id)).orElseThrow(
      () => new NotFoundException(),
    );
    appFound.name = body.name;
    appFound.description = body.description;
    const technoPromises = body.technos.map(name =>
      this.appTechnoSerice.saveNewTechno(name),
    );
    appFound.appTechnos = await Promise.all(technoPromises);
    await this.flowAppRepository.save(appFound);
    await this.searchIndex.saveObject({
      objectID: `${appFound.id}`,
      name: body.name,
      description: body.description,
      technos: appFound.appTechnos.map(techno => techno.name),
    });
    return appFound;
  }
}
