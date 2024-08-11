import {
  CreateUserDto,
  UserDatasource,
  UserEntity,
  UserRepository,
} from '../../domain';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly datasource: UserDatasource) {}
  createUser(user: CreateUserDto): Promise<UserEntity> {
    return this.datasource.createUser(user);
  }

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.datasource.findByEmail(email);
  }
}
