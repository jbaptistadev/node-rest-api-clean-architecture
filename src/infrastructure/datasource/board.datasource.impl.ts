import { prisma } from '../../data/postgres-repository';
import {
  BoardDatasource,
  BoardEntity,
  CreateBoardDto,
  UpdateBoardDto,
} from '../../domain';

export class BoardDataSourceImplt implements BoardDatasource {
  async getAllBoards(): Promise<BoardEntity[]> {
    const boards = await prisma.board.findMany();

    return boards.map((board) => BoardEntity.fromObject(board));
  }
  async createBoard({
    name,
    description,
    tags,
    posterImage,
    userId,
  }: CreateBoardDto): Promise<BoardEntity> {
    const newBoard = await prisma.board.create({
      data: {
        name,
        description,
        tags,
        posterImage,
        userId,
      },
    });

    return BoardEntity.fromObject(newBoard);
  }
  async updateBoard({
    id,
    name,
    description,
    posterImage,
    tags,
    userId,
  }: UpdateBoardDto): Promise<BoardEntity> {
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

    return BoardEntity.fromObject(updatedBoard);
  }
  async findBoard(params: Partial<BoardEntity>): Promise<BoardEntity | null> {
    const { name, id } = params;

    const board = await prisma.board.findFirst({
      where: {
        name,
        id,
      },
    });

    if (!board) {
      return null;
    }
    return BoardEntity.fromObject(board);
  }

  async deleteBoard(id: string): Promise<boolean> {
    try {
      await prisma.board.delete({
        where: {
          id,
        },
      });

      return true;
    } catch (error) {
      console.log('could not delete board', error);
      return false;
    }
  }
}
