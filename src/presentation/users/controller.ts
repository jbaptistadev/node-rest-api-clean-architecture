import { Request, Response } from 'express';
import { prisma } from '../../data/postgres-repository';
import { CreateUserDto } from '../../domain/dtos';

export class UsersController {
  public createUser = async (req: Request, res: Response) => {
    try {
      const [error, createUserDto] = CreateUserDto.create(req.body);

      if (error) {
        return res.status(400).json({
          message: error,
        });
      }

      const user = await prisma.user.findUnique({
        where: {
          email: createUserDto!.email,
        },
      });

      if (user) {
        return res.status(400).json({
          message: 'user already exists',
        });
      }

      const newUser = await prisma.user.create({
        data: {
          name: createUserDto!.name,
          email: createUserDto!.email,
        },
      });

      res.json(newUser);
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: 'failed to create user',
      });
    }
  };
}
