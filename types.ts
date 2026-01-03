
export interface TileData {
  id: string;
  icon: string;
  row: number;
  col: number;
}

export type Board = (TileData | null)[][];

export interface Point {
  row: number;
  col: number;
}
