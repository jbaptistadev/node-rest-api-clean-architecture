import { prisma } from '../../data/postgres-repository';
import { CreateUserDto, UserDatasource, UserEntity } from '../../domain';

export class UserDataSourceImplt implements UserDatasource {
  async createUser(userDto: CreateUserDto): Promise<UserEntity> {
    const newUser = await prisma.user.create({
      data: {
        name: userDto!.name,
        email: userDto!.email,
        password: userDto!.password,
      },
    });

    return UserEntity.fromObject(newUser);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return UserEntity.fromObject(user);
  }
}
