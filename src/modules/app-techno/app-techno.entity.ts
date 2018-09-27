import { DbAuditModel } from '../../utils/dbmodel.model';
import { Column, Entity, ManyToMany } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { FlowApp } from '../flow-app/flow-app.entity';

@Entity()
export class AppTechno extends DbAuditModel {
  @ApiModelProperty({ required: true })
  @Column({ length: 500 })
  name: string;

  @ManyToMany(type => FlowApp, apps => apps.appTechnos)
  apps: FlowApp[];
}
