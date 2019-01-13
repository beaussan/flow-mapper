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
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
