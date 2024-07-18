import { Request, Response } from 'express';

export class BoardsController {
  public getBoards = (req: Request, res: Response) => {
    res.json({
      message: 'getBoards',
    });
  };

  public getBoardById = (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) {
      return res.status(400).json({
        message: 'id must be a number',
      });
    }

    // TODO validations

    res.json({
      message: 'getBoardById ' + id,
    });
  };

  public createBoard = (req: Request, res: Response) => {
    // TODO validations

    res.json({
      message: 'createBoard',
    });
  };
  public updateBoard = (req: Request, res: Response) => {
    // TODO validations

    res.json({
      message: 'updateBoard',
    });
  };

  public deleteBoard = (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) {
      return res.status(400).json({
        message: 'id must be a number',
      });
    }

    // TODO validations
  };
}
