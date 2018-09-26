import { DbAuditModel } from '../../utils/dbmodel.model';
import { Column, Entity } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class AppTechno extends DbAuditModel {
  @ApiModelProperty({ required: true })
  @Column({ length: 500 })
  name: string;
}
