import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FlowTechnoRepository } from './flow-techno.repository';
import { SEARCH_CLIENT_PROVIDER } from '../core/search/search.constants';
import { Client, Index } from 'algoliasearch';
import { SEARCH_INDEX_NAME } from './flow-techno.constants';
import { FlowTechno } from './flow-techno.entity';
import Optional from 'typescript-optional';

@Injectable()
export class FlowTechnoService {
  private searchIndex: Index;

  constructor(
    @InjectRepository(FlowTechnoRepository)
    private readonly flowTechRepository: FlowTechnoRepository,
    @Inject(SEARCH_CLIENT_PROVIDER) private readonly searchClient: Client,
  ) {
    this.searchIndex = this.searchClient.initIndex(SEARCH_INDEX_NAME);
    /*
        this.searchIndex.setSettings({
          searchableAttributes: ['name'],
        });
        */
  }

  async saveNewTechno(name: string): Promise<FlowTechno> {
    const maybeTechno = await this.flowTechRepository.findOneWithNameIgnoringCase(
      name,
    );
    if (maybeTechno.isPresent) {
      return maybeTechno.get();
    } else {
      let flowTechno = new FlowTechno();
      flowTechno.name = name;
      flowTechno = await this.flowTechRepository.save(flowTechno);
      await this.searchIndex.addObject({
        objectID: flowTechno.id,
        name: flowTechno.name,
      });
      return flowTechno;
    }
  }

  async getAll(): Promise<FlowTechno[]> {
    return this.flowTechRepository.find();
  }

  async getOneById(id: number): Promise<Optional<FlowTechno>> {
    return this.flowTechRepository.findOneById(id);
  }

  async find(query: string): Promise<FlowTechno[]> {
    const res = await this.searchIndex.search(query);
    return res.hits.map((data: any) => {
      const returned = new FlowTechno();
      returned.id = data.objectID;
      returned.name = data.name;
      return returned;
    });
  }

  async updateName(id: number, newName: string): Promise<FlowTechno> {
    const technoFound = (await this.flowTechRepository.findOneById(
      id,
    )).orElseThrow(() => new NotFoundException());
    technoFound.name = newName;
    await this.flowTechRepository.save(technoFound);
    await this.searchIndex.saveObject({
      objectID: `${technoFound.id}`,
      name: newName,
    });
    return technoFound;
  }

  async deleteById(id: number): Promise<void> {
    const technoFound = (await this.flowTechRepository.findOneById(
      id,
    )).orElseThrow(() => new NotFoundException());
    await this.flowTechRepository.remove(technoFound);
    await this.searchIndex.deleteObject(`${id}`);
  }
}
