import type { CellValue } from '../models/types';
import type { Position } from '../models/types';

export class Cell {
  cellInput: HTMLInputElement;
  cellValue: CellValue;
  position: Position;

  constructor(cellInput: HTMLInputElement, position: Position) {
    this.cellInput = cellInput;
    this.cellValue = null;
    this.position = position;

    this.cellInput.addEventListener('click', () => {
      if (this.cellValue === null) {
        this.cellValue = 'X'; // Default to 'X' for the first player
        this.cellInput.value = this.cellValue;
      }
    });
  }
}
