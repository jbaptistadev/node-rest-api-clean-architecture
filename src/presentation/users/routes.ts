import { Router } from 'express';
import { UsersController } from './controller';

export class UsersRoutes {
  static get routes(): Router {
    const router = Router();
    const usersController = new UsersController();

    router.post('/', usersController.createUser);
    router.get('/:id', () => {});
    router.put('/:id', () => {});
    router.delete('/:id', () => {});

    return router;
  }
}
