import { Request, Response } from 'express';
import { prisma } from '../../data/postgres-repository';
import { BoardRepository } from '../../domain';

export class BoardsController {
  constructor(private readonly boardRepository: BoardRepository) {}

  public getBoards = async (_: Request, res: Response) => {
    // TODO this should be find by user id extracted from token
    // TODO this should get all boards of that user
    const boards = await this.boardRepository.getAllBoards();

    res.json(boards);
  };

  // public getBoardById = async (req: Request, res: Response) => {
  //   const id = req.params.id;

  //   // TODO this should validate user id extracted from token

  //   if (!id) {
  //     return res.status(400).json({
  //       message: 'id is required',
  //     });
  //   }

  //   const board = await prisma.board.findUnique({
  //     where: {
  //       id,
  //     },
  //   });

  //   if (!board) {
  //     return res.status(404).json({
  //       message: `board not found with id ${id}`,
  //     });
  //   }

  //   res.json(board);
  // };

  public createBoard = async (req: Request, res: Response) => {
    try {
      // TODO this should validate user id extracted from token
      const { name, description, tags, posterImage, userId } = req.body;

      if (!name || !description || !userId) {
        return res.status(400).json({
          message: 'name, description, userId are required',
        });
      }

      const board = await this.boardRepository.findBoard({
        name,
      });

      if (board) {
        return res.status(400).json({
          message: 'board already exists',
        });
      }

      const newBoard = await this.boardRepository.createBoard({
        name,
        description,
        tags,
        posterImage,
        userId,
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
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({
          message: 'id is required',
        });
      }

      const board = await this.boardRepository.findBoard({
        id,
      });

      if (!board) {
        return res.status(404).json({
          message: `board not found with id ${id}`,
        });
      }

      // TODO userId should be extracted from user token
      // TODO need to be create a board dto
      const { name, description, tags, posterImage, userId } = req.body;

      const updatedBoard = await this.boardRepository.updateBoard({
        id,
        name,
        description,
        tags,
        posterImage,
        userId,
      });

      res.json(updatedBoard);
    } catch (error) {
      console.log('error', error);
      res.json({
        message: 'Something went wrong when updating board',
      });
    }
  };

  public deleteBoard = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({
          message: 'id is required',
        });
      }

      const board = await this.boardRepository.findBoard({
        id,
      });

      if (!board) {
        return res.status(404).json({
          message: `board not found with id ${id}`,
        });
      }
      // TODO, in production, this should be a soft delete
      const isDeleted = await this.boardRepository.deleteBoard(id);

      // TODO need to improve error message
      res.json({
        message: isDeleted ? 'Board deleted successfully' : 'Board not found',
        success: isDeleted,
      });
    } catch (error) {
      res.json({
        message: 'Something went wrong',
      });
    }
  };
}
