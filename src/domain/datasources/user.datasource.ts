import { CreateUserDto } from '../dtos';
import { UserEntity } from '../entities/user.entity';

export abstract class UserDatasource {
  abstract createUser(user: CreateUserDto): Promise<UserEntity>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
}
