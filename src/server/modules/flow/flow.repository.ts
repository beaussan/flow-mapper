import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import Optional from 'typescript-optional';
import { Flow } from './flow.entity';

@EntityRepository(Flow)
export class FlowRepository extends Repository<Flow> {
  findAllWithRelations(): Promise<Flow[]> {
    return this.find({
      relations: [
        'destApp',
        'destApp.appTechnos',
        'sourceApp',
        'sourceApp.appTechnos',
        'flowTechnos',
        'flowTechnos.techno',
      ],
    });
  }
}
