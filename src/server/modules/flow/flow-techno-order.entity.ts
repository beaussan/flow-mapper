import { DbAuditModel } from '../../utils/dbmodel.model';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Flow } from './flow.entity';
import { FlowTechno } from '../flow-techno/flow-techno.entity';

@Entity()
export class FlowTechnoOrder extends DbAuditModel {
  @Column()
  position: number;

  @ManyToOne(type => Flow, type => type.flowTechnos, { nullable: false })
  flow: Flow;

  @ManyToOne(type => FlowTechno, techno => techno.flows, { nullable: false })
  techno: FlowTechno;
}
