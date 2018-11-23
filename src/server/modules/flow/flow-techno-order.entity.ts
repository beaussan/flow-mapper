import { DbAuditModel } from '../../utils/dbmodel.model';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Flow } from './flow.entity';
import { FlowTechno } from '../flow-techno/flow-techno.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class FlowTechnoOrder extends DbAuditModel {
  @Column()
  position: number;

  @ManyToOne(type => Flow, type => type.flowTechnos, { nullable: false })
  @Exclude()
  flow: Flow;

  @ManyToOne(type => FlowTechno, techno => techno.flows, { nullable: false })
  techno: FlowTechno;
}
