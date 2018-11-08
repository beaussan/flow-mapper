import { DbAuditModel } from '../../utils/dbmodel.model';
import { Column, Entity, ManyToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Role extends DbAuditModel {
  @Column({ unique: true })
  key: string;

  @ManyToMany(type => User, user => user.roles, { nullable: true })
  user: User[];
}
