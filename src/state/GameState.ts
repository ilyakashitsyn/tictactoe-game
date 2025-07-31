import type { Player, Position } from '../models/types';
import { Cell } from '../components/Cell';
import { checkWinner, isDraw, reset } from '../utils/checkWinner';

export class GameState {
  private currentPlayer: Player;
  private board: Cell[][];

  constructor(board: Cell[][]) {
    this.currentPlayer = 'X';
    this.board = board;
  }

  // Получение текущего игрока
  public getCurrentPlayer(): Player {
    return this.currentPlayer;
  }

  // Переключение игрока
  public switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

  // Установка значения в ячейку
  public makeMove(pos: Position): boolean {
    const cell = this.board[pos.row][pos.col];
    if (cell.getValue() === null) {
      cell.setValue(this.currentPlayer);
      return true;
    }
    return false;
  }
}
