import { Request, Response } from 'express';
import { prisma } from '../../data/postgres-repository';

export class BoardsController {
  public getBoards = async (req: Request, res: Response) => {
    // TODO this should be find by user id extracted from token

    const boards = await prisma.board.findMany();

    res.json(boards);
  };

  public getBoardById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    // TODO this should validate user id extracted from token

    if (isNaN(id)) {
      return res.status(400).json({
        message: 'id must be a number',
      });
    }

    const board = await prisma.board.findUnique({
      where: {
        id,
      },
    });

    if (!board) {
      return res.status(404).json({
        message: `board not found with id ${id}`,
      });
    }

    res.json(board);
  };

  public createBoard = async (req: Request, res: Response) => {
    try {
      // TODO this should validate user id extracted from token
      const { name, description, tags, posterImage, userId } = req.body;

      if (!name || !description || !tags || !posterImage || !userId) {
        return res.status(400).json({
          message:
            'name, description, tags, posterImage and userId are required',
        });
      }

      const board = await prisma.board.findFirst({
        where: {
          name,
        },
      });

      if (board) {
        return res.status(400).json({
          message: 'board already exists',
        });
      }

      const newBoard = await prisma.board.create({
        data: {
          name,
          description,
          tags,
          posterImage,
          userId: +userId,
        },
      });

      res.json(newBoard);
    } catch (error) {
      console.log(error);

      res.json({
        message: 'Something went wrong',
        error: JSON.stringify(error),
      });
    }
  };
  public updateBoard = async (req: Request, res: Response) => {
    // TODO this should validate user id extracted from token

    try {
      const id = +req.params.id;

      if (isNaN(id)) {
        return res.status(400).json({
          message: 'id must be a number',
        });
      }

      const board = await prisma.board.findFirst({
        where: {
          id,
        },
      });

      if (!board) {
        return res.status(404).json({
          message: `board not found with id ${id}`,
        });
      }

      const { name, description, tags, posterImage, userId } = req.body;
      const updatedBoard = await prisma.board.update({
        where: {
          id,
        },
        data: {
          name,
          description,
          tags,
          posterImage,
          userId,
        },
      });

      res.json(updatedBoard);
    } catch (error) {
      res.json({
        message: 'Something went wrong',
      });
    }
  };

  public deleteBoard = async (req: Request, res: Response) => {
    try {
      const id = +req.params.id;

      if (isNaN(id)) {
        return res.status(400).json({
          message: 'id must be a number',
        });
      }

      const board = await prisma.board.findFirst({
        where: {
          id,
        },
      });

      if (!board) {
        return res.status(404).json({
          message: `board not found with id ${id}`,
        });
      }
      // TODO, in production, this should be a soft delete
      await prisma.board.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      res.json({
        message: 'Something went wrong',
      });
    }
  };
}
