import { Repository } from 'typeorm';
import { AppTechno } from './app-techno.entity';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import Optional from 'typescript-optional';

@EntityRepository(AppTechno)
export class AppTechnoRepository extends Repository<AppTechno> {
  async findOneWithNameIgnoringCase(
    name: string,
  ): Promise<Optional<AppTechno>> {
    return Optional.ofNullable(
      await this.createQueryBuilder('app-techno')
        .where('LOWER(app-techno.name) = LOWER(:name)', { name })
        .getOne(),
    );
  }

  async findOneById(id: number): Promise<Optional<AppTechno>> {
    return Optional.ofNullable(await this.findOne(id));
  }
}
