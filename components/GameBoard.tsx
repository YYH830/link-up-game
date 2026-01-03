
import React from 'react';
import Tile from './Tile';
import type { Board, Point } from '../types';
import { ICONS, ICON_COLORS } from '../constants';

interface GameBoardProps {
  board: Board;
  onTileClick: (row: number, col: number) => void;
  selectedTile: Point | null;
  invalidMove: Point | null;
}

const GameBoard: React.FC<GameBoardProps> = ({ board, onTileClick, selectedTile, invalidMove }) => {
  if (!board.length) {
    return <div>Loading...</div>;
  }
  
  // FIX: Removed workaround for storing JSX in state. Logic is now in the component layer.
  const getIconComponent = (iconId: string) => {
    const iconIndex = parseInt(iconId.split('-')[1], 10);
    if (!isNaN(iconIndex) && iconIndex < ICONS.length) {
      return ICONS[iconIndex];
    }
    return ICONS[0]; // Fallback
  }

  // Slicing to remove the padding for rendering
  const renderBoard = board.slice(1, -1).map(row => row.slice(1, -1));
  
  return (
    <div className="bg-purple-100 p-2 md:p-4 rounded-lg shadow-lg">
      <div 
        className="grid gap-1" 
        style={{ 
          gridTemplateColumns: `repeat(${renderBoard[0]?.length || 1}, minmax(0, 1fr))`
        }}
      >
        {renderBoard.map((row, r) =>
          row.map((tileData, c) => {
            const actualRow = r + 1;
            const actualCol = c + 1;
            const isSelected = selectedTile?.row === actualRow && selectedTile?.col === actualCol;
            const isInvalid = invalidMove?.row === actualRow && invalidMove?.col === actualCol;
            
            let iconColor = 'text-gray-600';
            if (tileData) {
                // FIX: Correctly determine icon color based on the icon type index from the identifier.
                const iconIndex = parseInt(tileData.icon.split('-')[1], 10);
                if (!isNaN(iconIndex)) {
                    iconColor = ICON_COLORS[iconIndex % ICON_COLORS.length];
                }
            }

            return (
              <Tile
                key={`${actualRow}-${actualCol}`}
                icon={tileData ? React.cloneElement(getIconComponent(tileData.icon), { className: `${getIconComponent(tileData.icon).props.className} ${iconColor}` }) : null}
                onClick={() => onTileClick(actualRow, actualCol)}
                isSelected={isSelected}
                isInvalid={isInvalid}
                isEmpty={!tileData}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default GameBoard;
