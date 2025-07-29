export type Player = 'X' | 'O';
export type CellValue = Player | null;

export interface Position {
  row: number;
  col: number;
}
