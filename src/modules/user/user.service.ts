import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Optional from 'typescript-optional';
import { UserRepository } from './user.repository';
import { AuthType, User } from './user.entity';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { ROLES } from './role.constants';
import { LoggerService } from '../core/logger/logger.service';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private readonly logger: LoggerService,
  ) {}

  async onModuleInit(): Promise<void> {
    for (const role of Object.values(ROLES)) {
      if ((await this.roleRepository.count({ where: { key: role } })) === 1) {
        continue;
      }
      const roleObj = new Role();
      roleObj.key = role;
      await this.roleRepository.save(roleObj);
      this.logger.debug('Creating in database the role %s', role);
    }
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getNumberUserRegistredWithLocalAuth(): Promise<number> {
    return this.userRepository.count({ where: { authType: AuthType.LOCAL } });
  }

  async setUserAsAdmin(user: User): Promise<User> {
    user.isSuperUser = true;
    return this.userRepository.save(user);
  }

  async findOneWithEmailIgnoringCase(email: string): Promise<Optional<User>> {
    return this.userRepository.findOneWithEmailIgnoringCase(email);
  }

  async findOneWithWithGoogleId(id: string): Promise<Optional<User>> {
    return this.userRepository.findOneWithGoogleId(id);
  }

  async findOneWithWithFacebookId(id: string): Promise<Optional<User>> {
    return this.userRepository.findOneWithFacebookId(id);
  }

  async findOneWithWithTwitterId(id: string): Promise<Optional<User>> {
    return this.userRepository.findOneWithTwitterId(id);
  }

  async registerOne(user: User): Promise<User> {
    user.isSuperUser = false;
    const userRole = await this.roleRepository.findOne({
      where: { key: ROLES.ROLE_USER },
    });
    user.roles = [userRole];
    return this.userRepository.save(user);
  }

  findOneById(id: number): Promise<Optional<User>> {
    return this.userRepository.findOneById(id);
  }
}
