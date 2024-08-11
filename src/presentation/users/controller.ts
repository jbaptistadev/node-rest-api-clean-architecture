import { Request, Response } from 'express';
import { prisma } from '../../data/postgres-repository';
import { CreateUserDto } from '../../domain/dtos';
import { UserRepository } from '../../domain';

export class UsersController {
  constructor(private readonly userRepository: UserRepository) {}

  public createUser = async (req: Request, res: Response) => {
    try {
      const [error, createUserDto] = CreateUserDto.create(req.body);

      if (error) {
        return res.status(400).json({
          message: error,
        });
      }

      const user = await this.userRepository.findByEmail(createUserDto!.email);

      if (user) {
        return res.status(400).json({
          message: 'user already exists',
        });
      }

      const newUser = await this.userRepository.createUser(createUserDto!);

      res.json(newUser);
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: 'failed to create user',
      });
    }
  };
}
