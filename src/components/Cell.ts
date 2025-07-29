import type { CellValue } from '../models/types';
import type { Position } from '../models/types';

export class Cell {
  private cellInput: HTMLInputElement;
  private cellValue: CellValue;
  private position: Position;
  private onClick: (pos: Position) => void;

  constructor(
    cellInput: HTMLInputElement,
    position: Position,
    onClick: (pos: Position) => void,
  ) {
    this.cellInput = cellInput;
    this.position = position;
    this.cellValue = null;
    this.onClick = onClick;

    this.cellInput.addEventListener('click', () => {
      if (this.cellValue === null) {
        this.onClick(this.position);
      }
    });
  }

  public setValue(value: CellValue): void {
    this.cellValue = value;
    this.cellInput.value = value ?? '';
  }

  public getValue(): CellValue {
    return this.cellValue;
  }

  public clear(): void {
    this.cellValue = null;
    this.cellInput.value = '';
  }
}
