import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import Optional from 'typescript-optional';
import { Flow } from './flow.entity';

@EntityRepository(Flow)
export class FlowRepository extends Repository<Flow> {}
