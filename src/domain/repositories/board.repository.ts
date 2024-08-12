import { CreateBoardDto, UpdateBoardDto } from '../dtos';
import { BoardEntity } from '../entities/board.entity';

export abstract class BoardRepository {
  abstract createBoard(board: CreateBoardDto): Promise<BoardEntity>;
  abstract updateBoard(board: UpdateBoardDto): Promise<BoardEntity>;
  abstract findBoard(params: Partial<BoardEntity>): Promise<BoardEntity | null>;
  abstract getAllBoards(): Promise<BoardEntity[]>;
  abstract deleteBoard(id: string): Promise<boolean>;
}
