import { Router } from 'express';
import { BoardsController } from './controller';

export class BoardRoutes {
  static get routes(): Router {
    const router = Router();

    const boardsController = new BoardsController();

    router.get('/', boardsController.getBoards);
    router.get('/:id', boardsController.getBoardById);
    router.post('/', boardsController.createBoard);
    router.put('/:id', boardsController.updateBoard);
    router.delete('/:id', boardsController.deleteBoard);

    return router;
  }
}
