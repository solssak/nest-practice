import { Controller, Get, Param } from '@nestjs/common';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/:id')
  async getBoardById(@Param('id') id: number): Promise<Board> {
    return await this.boardsService.getBoardById(id);
  }
}
