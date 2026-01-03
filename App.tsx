
import React, { useState, useEffect, useCallback } from 'react';
import GameBoard from './components/GameBoard';
import GameStatusModal from './components/GameStatusModal';
import { createBoard, findPath } from './services/gameLogic';
import type { Board, TileData, Point } from './types';
import { BOARD_ROWS, BOARD_COLS, ICONS } from './constants';

const App: React.FC = () => {
  const [board, setBoard] = useState<Board>([]);
  const [selectedTile, setSelectedTile] = useState<Point | null>(null);
  const [tilesLeft, setTilesLeft] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [invalidMove, setInvalidMove] = useState<Point | null>(null);

  const initializeGame = useCallback(() => {
    // FIX: Pass the number of icon types to createBoard instead of the component array to decouple logic from view.
    const newBoard = createBoard(BOARD_ROWS, BOARD_COLS, ICONS.length);
    setBoard(newBoard);
    setSelectedTile(null);
    setIsWon(false);
    setTilesLeft(BOARD_ROWS * BOARD_COLS);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleRestart = () => {
    initializeGame();
  };

  const handleTileClick = (row: number, col: number) => {
    if (isChecking || isWon || !board[row][col]) {
      return;
    }

    const clickedPoint = { row, col };

    if (!selectedTile) {
      setSelectedTile(clickedPoint);
    } else {
      if (selectedTile.row === row && selectedTile.col === col) {
        setSelectedTile(null);
        return;
      }

      const tile1 = board[selectedTile.row][selectedTile.col];
      const tile2 = board[row][col];

      if (tile1 && tile2 && tile1.icon === tile2.icon) {
        setIsChecking(true);
        const path = findPath(board, selectedTile, clickedPoint);
        if (path) {
          setTimeout(() => {
            setBoard(prevBoard => {
              const newBoard = prevBoard.map(r => [...r]);
              newBoard[selectedTile.row][selectedTile.col] = null;
              newBoard[row][col] = null;
              return newBoard;
            });
            setTilesLeft(prev => prev - 2);
            setSelectedTile(null);
            setIsChecking(false);
          }, 300);
        } else {
          setInvalidMove(clickedPoint);
          setSelectedTile(null);
          setTimeout(() => {
            setInvalidMove(null);
            setIsChecking(false);
          }, 500);
        }
      } else {
        setInvalidMove(clickedPoint);
        setSelectedTile(clickedPoint);
        setTimeout(() => {
            setInvalidMove(null);
        }, 500);
      }
    }
  };

  useEffect(() => {
    if (tilesLeft === 0 && (BOARD_ROWS * BOARD_COLS) > 0) {
      setIsWon(true);
    }
  }, [tilesLeft]);

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4 font-sans">
      <header className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-400 tracking-wider">
          Macaron Link-Up
        </h1>
        <p className="text-gray-500 mt-2">Clear the board by matching pairs!</p>
      </header>
      
      <main className="flex flex-col items-center">
        <GameBoard 
          board={board} 
          onTileClick={handleTileClick} 
          selectedTile={selectedTile}
          invalidMove={invalidMove}
        />
        <button
          onClick={handleRestart}
          className="mt-6 px-6 py-3 bg-rose-400 text-white font-semibold rounded-lg shadow-md hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
        >
          Restart Game
        </button>
      </main>

      <GameStatusModal isOpen={isWon} onRestart={handleRestart} />
    </div>
  );
};

export default App;
