import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Optional from 'typescript-optional';
import { UserRepository } from './user.repository';
import { AuthType, User } from './user.entity';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { ROLES } from './role.constants';
import { LoggerService } from '../core/logger/logger.service';
import { RegisterFromAdminUserDto } from './user.dto';
import { CryptoService } from '../core/crypto/crypto.service';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private readonly logger: LoggerService,
    private readonly cryptoService: CryptoService,
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
    return this.userRepository.find({
      relations: ['roles'],
      order: { id: 'ASC' },
    });
  }

  async getNumberUserRegistredWithLocalAuth(): Promise<number> {
    return this.userRepository.count({ where: { authType: AuthType.LOCAL } });
  }

  async setUserAsAdmin(user: User): Promise<User> {
    user.isSuperUser = true;
    return this.userRepository.save(user);
  }

  async demoteUser(userId: number): Promise<User> {
    if ((await this.userRepository.getNumberOfSuperUser()) === 1) {
      throw new BadRequestException('There must be at least one super user');
    }
    const user = (await this.findOneById(userId)).orElseThrow(
      () => new NotFoundException(),
    );
    user.isSuperUser = false;
    return this.userRepository.save(user);
  }

  async promoteUser(userId: number): Promise<User> {
    const user = (await this.findOneById(userId)).orElseThrow(
      () => new NotFoundException(),
    );
    return this.setUserAsAdmin(user);
  }

  async updateRoles(userId: number, roleInput: string[]): Promise<User> {
    const user = (await this.findOneById(userId)).orElseThrow(
      () => new NotFoundException(),
    );
    user.roles = await Promise.all(
      roleInput.map(role => this.findRoleWithKey(role)),
    );

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
    let roles = [];

    if (process.env.IS_NEW_USER_HAVE_WRITE_ACCESS === 'true') {
      roles = await Promise.all(
        [ROLES.ROLE_EDIT_FLOW, ROLES.ROLE_EDIT_APPS, ROLES.ROLE_USER].map(key =>
          this.findRoleWithKey(key),
        ),
      );
    } else {
      roles = [await this.findRoleWithKey(ROLES.ROLE_USER)];
    }

    user.roles = roles;
    return this.userRepository.save(user);
  }

  async findRoleWithKey(key: string): Promise<Role> {
    return await this.roleRepository.findOne({ where: { key } });
  }

  findOneById(id: number): Promise<Optional<User>> {
    return this.userRepository.findOneById(id);
  }

  async registerOneWithAdmin(
    register: RegisterFromAdminUserDto,
  ): Promise<User> {
    const user = new User();
    user.localEmail = register.email;
    user.isSuperUser = register.isSuperUser;
    user.name = register.name;
    user.roles = await Promise.all(
      register.roles.map(role => this.findRoleWithKey(role)),
    );
    user.localPassword = await this.cryptoService.hash(register.password);
    user.authType = AuthType.LOCAL;

    return this.userRepository.save(user);
  }
}
