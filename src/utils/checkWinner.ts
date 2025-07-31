import type { Player, Position } from '../models/types';
import { Cell } from '../components/Cell';
import { Board } from '../components/Board';

export function checkWinner(_player: Player, board: Cell[][]) {
  const lines: Position[][] = [
    // Горизонтальные линии
    [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
    ],
    [
      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: 1, col: 2 },
    ],
    [
      { row: 2, col: 0 },
      { row: 2, col: 1 },
      { row: 2, col: 2 },
    ],

    // Вертикальные линии
    [
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 2, col: 0 },
    ],
    [
      { row: 0, col: 1 },
      { row: 1, col: 1 },
      { row: 2, col: 1 },
    ],
    [
      { row: 0, col: 2 },
      { row: 1, col: 2 },
      { row: 2, col: 2 },
    ],

    // Диагонали
    [
      { row: 0, col: 0 },
      { row: 1, col: 1 },
      { row: 2, col: 2 },
    ],
    [
      { row: 0, col: 2 },
      { row: 1, col: 1 },
      { row: 2, col: 0 },
    ],
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    const valA = board[a.row][a.col].getValue();
    const valB = board[b.row][b.col].getValue();
    const valC = board[c.row][c.col].getValue();

    if (valA && valA === valB && valA === valC) {
      return valA;
    }
  }

  return null;
}

// Проверка на ничью
export function isDraw(board: Cell[][]): boolean {
  const cells = board.flat();
  return cells.every(cell => cell.getValue() !== null);
}

// Сброс состояния игры
export function reset(board: Board): void {
  board.clear?.();
  board.getAllCells().forEach(row => row.forEach(cell => cell.clear()));
}
