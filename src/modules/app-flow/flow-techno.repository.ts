import { Repository } from 'typeorm';
import { FlowTechno } from './flow-techno.entity';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import Optional from 'typescript-optional';

@EntityRepository(FlowTechno)
export class FlowTechnoRepository extends Repository<FlowTechno> {
  async findOneWithNameIgnoringCase(
    name: string,
  ): Promise<Optional<FlowTechno>> {
    return Optional.ofNullable(
      await this.createQueryBuilder('flow-techno')
        .where('LOWER(flow-techno.name) = LOWER(:name)', { name })
        .getOne(),
    );
  }

  async findOneById(id: number): Promise<Optional<FlowTechno>> {
    return Optional.ofNullable(await this.findOne(id));
  }
}
