import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Optional from 'typescript-optional';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
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

  async saveOne(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  findOneById(id: number): Promise<Optional<User>> {
    return this.userRepository.findOneById(id);
  }
}
