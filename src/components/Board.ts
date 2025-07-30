import { Cell } from './Cell';
import type { Position } from '../models/types';

export class Board {
  private cells: Cell[][];
  private container: HTMLDivElement;

  constructor(onCellClick: (pos: Position) => void) {
    this.container = document.getElementById('game') as HTMLDivElement;
    this.cells = [];

    // Создаем сетку ячеек
    for (let row = 0; row < 3; row++) {
      const cellRow: Cell[] = [];
      for (let col = 0; col < 3; col++) {
        const position: Position = { row, col };
        const cell = new Cell(position, onCellClick);
        cellRow.push(cell);
        this.container.appendChild(cell.getElement());
      }
      this.cells.push(cellRow);
    }
  }

  // Возвращает язычейку по позиции
  public getCell(position: Position): Cell {
    return this.cells[position.row][position.col];
  }

  // Получение всех ячеек
  public getAllCells(): Cell[][] {
    return this.cells;
  }

  // Очищение всех ячеек
  public clear(): void {
    this.cells.forEach(row => row.forEach(cell => cell.clear()));
  }

  // Запретить взаимодействие с ячейками
  public disable(): void {
    this.cells.forEach(row => row.forEach(cell => cell.disable()));
  }
}
