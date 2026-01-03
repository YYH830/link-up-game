
import type { Board, TileData, Point } from '../types';

function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

export function createBoard(
  rows: number,
  cols: number,
  numIconTypes: number,
): Board {
  const totalTiles = rows * cols;
  if (totalTiles % 2 !== 0) {
    throw new Error('Board must have an even number of tiles.');
  }

  const iconIdentifiers: string[] = [];
  const numPairs = totalTiles / 2;
  for (let i = 0; i < numPairs; i++) {
    const iconType = i % numIconTypes;
    const iconIdentifier = `icon-${iconType}`;
    iconIdentifiers.push(iconIdentifier, iconIdentifier);
  }

  const shuffledIdentifiers = shuffle(iconIdentifiers);

  const board: Board = Array(rows + 2)
    .fill(null)
    .map(() => Array(cols + 2).fill(null));

  shuffledIdentifiers.forEach((iconIdentifier, index) => {
    const row = Math.floor(index / cols) + 1;
    const col = (index % cols) + 1;
    board[row][col] = {
      id: `${index}-${new Date().getTime()}`,
      icon: iconIdentifier,
      row: row,
      col: col,
    };
  });

  return board;
}

function isLineClear(board: Board, p1: Point, p2: Point): boolean {
  if (p1.row === p2.row) {
    // Horizontal
    const start = Math.min(p1.col, p2.col);
    const end = Math.max(p1.col, p2.col);
    for (let c = start + 1; c < end; c++) {
      if (board[p1.row][c] !== null) return false;
    }
  } else if (p1.col === p2.col) {
    // Vertical
    const start = Math.min(p1.row, p2.row);
    const end = Math.max(p1.row, p2.row);
    for (let r = start + 1; r < end; r++) {
      if (board[r][p1.col] !== null) return false;
    }
  } else {
    return false; // Not a straight line
  }
  return true;
}

export function findPath(board: Board, p1: Point, p2: Point): boolean {
  // 0 Turns (straight line)
  if ((p1.row === p2.row || p1.col === p2.col) && isLineClear(board, p1, p2)) {
    return true;
  }

  // 1 Turn
  const corner1: Point = { row: p1.row, col: p2.col };
  if (
    board[corner1.row][corner1.col] === null &&
    isLineClear(board, p1, corner1) &&
    isLineClear(board, corner1, p2)
  ) {
    return true;
  }
  const corner2: Point = { row: p2.row, col: p1.col };
  if (
    board[corner2.row][corner2.col] === null &&
    isLineClear(board, p1, corner2) &&
    isLineClear(board, corner2, p2)
  ) {
    return true;
  }

  // 2 Turns
  const rows = board.length;
  const cols = board[0].length;
  // Check horizontal extensions from p1
  for (let c = 0; c < cols; c++) {
    const p3: Point = { row: p1.row, col: c };
    if (
      board[p3.row][p3.col] === null ||
      (p3.row === p2.row && p3.col === p2.col)
    ) {
      if (isLineClear(board, p1, p3)) {
        const corner: Point = { row: p2.row, col: c };
        if (
          board[corner.row][corner.col] === null ||
          (corner.row === p3.row && corner.col === p3.col)
        ) {
          if (isLineClear(board, p3, corner) && isLineClear(board, corner, p2)) {
            return true;
          }
        }
      }
    }
  }
  // Check vertical extensions from p1
  for (let r = 0; r < rows; r++) {
    const p3: Point = { row: r, col: p1.col };
    if (
      board[p3.row][p3.col] === null ||
      (p3.row === p2.row && p3.col === p2.col)
    ) {
      if (isLineClear(board, p1, p3)) {
        const corner: Point = { row: r, col: p2.col };
        if (
          board[corner.row][corner.col] === null ||
          (corner.row === p3.row && corner.col === p3.col)
        ) {
          if (isLineClear(board, p3, corner) && isLineClear(board, corner, p2)) {
            return true;
          }
        }
      }
    }
  }

  return false;
}
