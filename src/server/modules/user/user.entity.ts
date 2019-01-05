import { DbAuditModel } from '../../utils/dbmodel.model';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { Role } from './role.entity';
import { Exclude } from 'class-transformer';

export enum AuthType {
  LOCAL,
  GOOGLE,
  FACEBOOK,
  TWITTER,
}

@Entity()
export class User extends DbAuditModel {
  @Column({
    type: 'enum',
    enum: [
      AuthType.LOCAL,
      AuthType.GOOGLE,
      AuthType.FACEBOOK,
      AuthType.TWITTER,
    ],
  })
  authType: AuthType;

  @Column({ nullable: true })
  localEmail: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @Exclude()
  localPassword: string;

  @Column({ nullable: true })
  @Exclude()
  googleId: string;

  @Column({ nullable: true })
  googleEmail: string;

  @Column({ nullable: true })
  googleDisplayName: string;

  @Column({ nullable: true })
  @Exclude()
  facebookId: string;

  @Column({ nullable: true })
  facebookEmail: string;

  @Column({ nullable: true })
  @Exclude()
  twitterId: string;

  @Column({ nullable: true })
  twitterUsername: string;

  @Column({ nullable: true })
  twitterDisplayName: string;

  @ManyToMany(type => Role, role => role.user, { nullable: true })
  @JoinTable()
  roles: Role[];

  @Column({ default: false })
  isSuperUser: boolean;
}
