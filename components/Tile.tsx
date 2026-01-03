
import React from 'react';
import { TILE_COLORS } from '../constants';

interface TileProps {
  icon: React.ReactElement | null;
  onClick: () => void;
  isSelected: boolean;
  isInvalid: boolean;
  isEmpty: boolean;
}

const Tile: React.FC<TileProps> = ({ icon, onClick, isSelected, isInvalid, isEmpty }) => {
  if (isEmpty) {
    return <div className="w-12 h-12 md:w-16 md:h-16" />;
  }

  const baseStyle = "w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-200 ease-in-out transform";
  
  let stateStyle = TILE_COLORS.base;
  if(isSelected) stateStyle = TILE_COLORS.selected;
  if(isInvalid) stateStyle = TILE_COLORS.invalid;

  return (
    <div
      onClick={onClick}
      className={`${baseStyle} ${stateStyle} ${!isSelected && !isInvalid ? 'hover:scale-110 hover:shadow-md' : ''}`}
    >
      {icon}
    </div>
  );
};

export default Tile;
