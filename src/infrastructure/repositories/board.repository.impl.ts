import {
  BoardDatasource,
  BoardEntity,
  BoardRepository,
  CreateBoardDto,
  UpdateBoardDto,
} from '../../domain';

export class BoardRepositoryImpl implements BoardRepository {
  constructor(private readonly datasource: BoardDatasource) {}
  updateBoard(board: UpdateBoardDto): Promise<BoardEntity> {
    return this.datasource.updateBoard(board);
  }
  findBoard(params: Partial<BoardEntity>): Promise<BoardEntity | null> {
    return this.datasource.findBoard(params);
  }
  getAllBoards(): Promise<BoardEntity[]> {
    return this.datasource.getAllBoards();
  }

  createBoard(board: CreateBoardDto): Promise<BoardEntity> {
    return this.datasource.createBoard(board);
  }

  deleteBoard(id: string): Promise<boolean> {
    return this.datasource.deleteBoard(id);
  }
}
