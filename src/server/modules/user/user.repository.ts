import { Repository, EntityRepository } from 'typeorm';
import Optional from 'typescript-optional';
import { User } from './user.entity';
import { AppTechno } from '../app-techno/app-techno.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findOneWithEmailIgnoringCase(email: string): Promise<Optional<User>> {
    const foundUser = await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .where('LOWER(user.localEmail) = LOWER(:email)', { email })
      .getOne();
    console.log('USER FROM DB : ', foundUser);
    return Optional.ofNullable(foundUser);
  }

  async findOneWithGoogleId(googleId: string): Promise<Optional<User>> {
    return Optional.ofNullable(
      await this.createQueryBuilder('user')
        .leftJoinAndSelect('user.roles', 'roles')
        .where('user.googleId = :googleId', { googleId })
        .getOne(),
    );
  }

  async findOneWithFacebookId(facebookId: string): Promise<Optional<User>> {
    return Optional.ofNullable(
      await this.createQueryBuilder('user')
        .leftJoinAndSelect('user.roles', 'roles')
        .where('user.facebookId = :facebookId', { facebookId })
        .getOne(),
    );
  }

  async findOneWithTwitterId(twitterId: string): Promise<Optional<User>> {
    return Optional.ofNullable(
      await this.createQueryBuilder('user')
        .leftJoinAndSelect('user.roles', 'roles')
        .where('user.twitterId = :twitterId', { twitterId })
        .getOne(),
    );
  }

  async findOneById(id: number): Promise<Optional<User>> {
    return Optional.ofNullable(
      await this.findOne(id, { relations: ['roles'] }),
    );
  }

  async getNumberOfSuperUser(): Promise<number> {
    return this.count({ where: { isSuperUser: true } });
  }
}
