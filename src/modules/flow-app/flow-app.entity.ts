import { DbAuditModel } from '../../utils/dbmodel.model';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { AppTechno } from '../app-techno/app-techno.entity';

@Entity()
export class FlowApp extends DbAuditModel {
  @ApiModelProperty({ required: true })
  @Column({ length: 500, unique: true })
  name: string;

  @ApiModelProperty({ required: false })
  @Column({ length: 1000 })
  description: string;

  @ApiModelProperty({ required: true })
  @ManyToMany(type => AppTechno, techno => techno.apps, {
    cascade: true,
  })
  @JoinTable()
  appTechnos: AppTechno[];
}
