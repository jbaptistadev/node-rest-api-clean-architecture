import { Router } from 'express';
import { UsersController } from './controller';
import { UserDataSourceImplt } from '../../infrastructure/datasource/user.datasource.impl';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl';

export class UsersRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new UserDataSourceImplt();
    const repository = new UserRepositoryImpl(datasource);
    const usersController = new UsersController(repository);

    router.post('/', usersController.createUser);
    router.get('/:id', () => {});
    router.put('/:id', () => {});
    router.delete('/:id', () => {});

    return router;
  }
}
