import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Role } from './role.entity';
import { UserController } from './user.controller';
import { CryptoModule } from '../core/crypto/crypto.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRepository, Role]),
    CryptoModule,
  ],
  providers: [UserService],
  controllers: [
    process.env.IS_AUTH_ENABLED === 'true' ? UserController : undefined,
  ].filter(val => val !== undefined),
  exports: [UserService],
})
export class UserModule {}
