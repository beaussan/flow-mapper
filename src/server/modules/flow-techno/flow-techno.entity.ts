import { DbAuditModel } from '../../utils/dbmodel.model';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { FlowApp } from '../flow-app/flow-app.entity';
import { FlowTechnoOrder } from '../flow/flow-techno-order.entity';

@Entity()
export class FlowTechno extends DbAuditModel {
  @ApiModelProperty({ required: true })
  @Column({ length: 500 })
  name: string;

  @ManyToMany(type => FlowApp, apps => apps.appTechnos)
  apps: FlowApp[];

  @ManyToOne(type => FlowTechnoOrder, flow => flow.techno)
  flows: FlowTechnoOrder[];
}
