import React from 'react';
import { Position, BOARD_SIZE } from '../types/game';

interface GameBoardProps {
  snake: Position[];
  food: Position;
}

export default function GameBoard({ snake, food }: GameBoardProps) {
  const renderCell = (x: number, y: number) => {
    const isSnakeHead = snake[0].x === x && snake[0].y === y;
    const isSnakeBody = snake.some((segment, index) => index > 0 && segment.x === x && segment.y === y);
    const isFood = food.x === x && food.y === y;

    return (
      <div
        key={`${x}-${y}`}
        className={`
          game-cell aspect-square border border-gray-800
          ${isSnakeHead ? 'snake-segment bg-gradient-to-br from-green-300 to-green-500' : ''}
          ${isSnakeBody ? 'snake-segment' : ''}
          ${isFood ? 'food' : ''}
          ${!isSnakeHead && !isSnakeBody && !isFood ? 'bg-gray-900' : ''}
        `}
      />
    );
  };

  return (
    <div 
      className="grid gap-0 bg-gray-800 p-2 rounded-lg shadow-2xl"
      style={{
        gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
        width: '100%',
        maxWidth: '600px',
        aspectRatio: '1'
      }}
    >
      {Array.from({ length: BOARD_SIZE }, (_, y) =>
        Array.from({ length: BOARD_SIZE }, (_, x) => renderCell(x, y))
      )}
    </div>
  );
}