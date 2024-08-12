import { Router } from 'express';
import { BoardsController } from './controller';
import { BoardDataSourceImplt } from '../../infrastructure/datasource/board.datasource.impl';
import { BoardRepositoryImpl } from '../../infrastructure/repositories/board.repository.impl';

export class BoardRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new BoardDataSourceImplt();
    const repository = new BoardRepositoryImpl(datasource);
    const boardsController = new BoardsController(repository);

    router.get('/', boardsController.getBoards);
    router.post('/', boardsController.createBoard);
    router.put('/:id', boardsController.updateBoard);
    router.delete('/:id', boardsController.deleteBoard);

    return router;
  }
}
