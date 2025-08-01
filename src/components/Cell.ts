import type { CellValue, Position } from '../models/types';

export class Cell {
  disable(): void {
    throw new Error('Method not implemented.');
  }

  private element: HTMLDivElement;
  private cellValue: CellValue;
  private position: Position;
  public onClick: (pos: Position) => void;

  constructor(position: Position, onClick: (pos: Position) => void) {
    this.position = position;
    this.cellValue = null;
    this.onClick = onClick;

    // Создаем DOM элемент
    this.element = document.createElement('div');
    this.element.classList.add('cell');

    // Вешаем слушатель события клика на input
    this.element.addEventListener('click', () => {
      if (this.cellValue === null) {
        this.onClick(this.position);
      }
    });
  }

  // Метод, который возвращает DOM элемент
  public getElement(): HTMLDivElement {
    return this.element;
  }

  // Установка значения ячейки
  public setValue(value: CellValue): void {
    this.cellValue = value;
    this.element.textContent = value ?? '';
    this.element.classList.add(value === 'X' ? 'x' : 'o');
  }

  // Получение доступа к значению ячейки
  public getValue(): CellValue {
    return this.cellValue;
  }

  // Очищение значения ячейки
  public clear(): void {
    this.cellValue = null;
    this.element.textContent = '';
    this.element.classList.remove('x', 'o');
  }

  // Проверка, пуста ли ячейка
  public isEmpty(): boolean {
    return this.cellValue === null;
  }

  // Получение позиции ячейки
  public render(): HTMLDivElement {
    const cellEl = document.createElement('div');
    cellEl.classList.add('cell');
    cellEl.textContent = this.cellValue ?? '';
    return cellEl;
  }
}
