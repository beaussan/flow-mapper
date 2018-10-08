import { EntityRepository, Repository } from 'typeorm';
import { FlowApp } from './flow-app.entity';
import Optional from 'typescript-optional';

@EntityRepository(FlowApp)
export class FlowAppRepository extends Repository<FlowApp> {
  async findOneById(id: number): Promise<Optional<FlowApp>> {
    return Optional.ofNullable(
      await this.findOne(id, { relations: ['appTechnos'] }),
    );
  }
}
