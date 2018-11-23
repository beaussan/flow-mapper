import { DbAuditModel } from '../../utils/dbmodel.model';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { FlowApp } from '../flow-app/flow-app.entity';
import { FlowTechnoOrder } from './flow-techno-order.entity';

@Entity()
export class Flow extends DbAuditModel {
  @ApiModelProperty({ required: true })
  @Column({ length: 500 })
  name: string;

  @ApiModelProperty({ required: false })
  @Column({ length: 4000, nullable: true })
  description: string;

  @ApiModelProperty({ required: true })
  @ManyToOne(type => FlowApp, app => app.flowsSource)
  sourceApp: FlowApp;

  @ApiModelProperty({ required: true })
  @ManyToOne(type => FlowApp, app => app.flowsDestination)
  destApp: FlowApp;

  @ApiModelProperty({ required: true })
  @OneToMany(type => FlowTechnoOrder, flowTechno => flowTechno.flow)
  flowTechnos: FlowTechnoOrder[];
}
