import { Router } from 'express';
import { BoardsController } from './boards/controller';
import { BoardRoutes } from './boards/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/boards', BoardRoutes.routes);

    return router;
  }
}
