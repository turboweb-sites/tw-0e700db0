export interface Position {
  x: number;
  y: number;
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface GameState {
  snake: Position[];
  food: Position;
  direction: Direction;
  nextDirection: Direction;
  score: number;
  highScore: number;
  isGameOver: boolean;
  isPaused: boolean;
  isPlaying: boolean;
  speed: number;
}

export const BOARD_SIZE = 20;
export const INITIAL_SPEED = 150;
export const SPEED_INCREASE = 5;

export const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 }
];