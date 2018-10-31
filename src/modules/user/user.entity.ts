import { DbAuditModel } from '../../utils/dbmodel.model';
import { Column, Entity, ManyToMany } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

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

  roles: string[] = [];

  @Column({ nullable: true })
  localEmail: string;

  @Column({ nullable: true })
  localPassword: string;

  @Column({ nullable: true })
  googleId: string;

  @Column({ nullable: true })
  googleEmail: string;

  @Column({ nullable: true })
  googleDisplayName: string;

  @Column({ nullable: true })
  facebookId: string;

  @Column({ nullable: true })
  facebookEmail: string;

  @Column({ nullable: true })
  twitterId: string;

  @Column({ nullable: true })
  twitterUsername: string;

  @Column({ nullable: true })
  twitterDisplayName: string;
}
