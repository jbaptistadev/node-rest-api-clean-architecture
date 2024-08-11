import { Router } from 'express';
import { BoardsController } from './boards/controller';
import { BoardRoutes } from './boards/routes';
import { UsersRoutes } from './users/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/users', UsersRoutes.routes);
    router.use('/api/boards', BoardRoutes.routes);

    return router;
  }
}
