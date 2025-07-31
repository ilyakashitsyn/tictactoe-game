import type { Player, Position } from '../models/types';
import { Cell } from '../components/Cell';
import { checkWinner, isDraw } from '../utils/checkWinner';

export class GameState {
  private currentPlayer: Player;
  private board: Cell[][];

  private winner: Player | null = null;
  private draw: boolean = false;

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

  // Проверка на победителя
  public getWinner(): Player | null {
    return this.winner;
  }

  // Проверка на ничью
  public isDraw(): boolean {
    return this.draw;
  }

  // Обработка клика по ячейке
  handleCellClick(position: Position): void {
    const cell = this.board[position.row][position.col];
    if (!cell.isEmpty() || this.winner || this.draw) return;

    cell.setValue(this.currentPlayer);

    if (checkWinner(this.currentPlayer, this.board)) {
      this.winner = this.currentPlayer;
      return;
    }

    if (isDraw(this.board)) {
      this.draw = true;
      return;
    }

    this.switchPlayer();
  }
}
