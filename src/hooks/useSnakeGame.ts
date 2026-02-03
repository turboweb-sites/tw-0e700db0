import { useState, useEffect, useCallback, useRef } from 'react';
import { Position, Direction, GameState, BOARD_SIZE, INITIAL_SPEED, SPEED_INCREASE, INITIAL_SNAKE } from '../types/game';

const generateFood = (snake: Position[]): Position => {
  let food: Position;
  do {
    food = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE)
    };
  } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
  return food;
};

export const useSnakeGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: generateFood(INITIAL_SNAKE),
    direction: 'RIGHT',
    nextDirection: 'RIGHT',
    score: 0,
    highScore: parseInt(localStorage.getItem('snakeHighScore') || '0'),
    isGameOver: false,
    isPaused: false,
    isPlaying: false,
    speed: INITIAL_SPEED
  });

  const gameLoopRef = useRef<NodeJS.Timeout>();

  const moveSnake = useCallback(() => {
    setGameState(prevState => {
      if (prevState.isGameOver || prevState.isPaused || !prevState.isPlaying) {
        return prevState;
      }

      const head = prevState.snake[0];
      let newHead: Position;

      // Update direction
      const direction = prevState.nextDirection;

      switch (direction) {
        case 'UP':
          newHead = { x: head.x, y: head.y - 1 };
          break;
        case 'DOWN':
          newHead = { x: head.x, y: head.y + 1 };
          break;
        case 'LEFT':
          newHead = { x: head.x - 1, y: head.y };
          break;
        case 'RIGHT':
          newHead = { x: head.x + 1, y: head.y };
          break;
      }

      // Check wall collision
      if (newHead.x < 0 || newHead.x >= BOARD_SIZE || newHead.y < 0 || newHead.y >= BOARD_SIZE) {
        const newHighScore = Math.max(prevState.score, prevState.highScore);
        localStorage.setItem('snakeHighScore', newHighScore.toString());
        return { ...prevState, isGameOver: true, highScore: newHighScore };
      }

      // Check self collision
      if (prevState.snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        const newHighScore = Math.max(prevState.score, prevState.highScore);
        localStorage.setItem('snakeHighScore', newHighScore.toString());
        return { ...prevState, isGameOver: true, highScore: newHighScore };
      }

      const newSnake = [newHead, ...prevState.snake];
      let newFood = prevState.food;
      let newScore = prevState.score;
      let newSpeed = prevState.speed;

      // Check food collision
      if (newHead.x === prevState.food.x && newHead.y === prevState.food.y) {
        newScore += 10;
        newFood = generateFood(newSnake);
        // Increase speed every 50 points
        if (newScore % 50 === 0) {
          newSpeed = Math.max(50, newSpeed - SPEED_INCREASE);
        }
      } else {
        newSnake.pop();
      }

      return {
        ...prevState,
        snake: newSnake,
        food: newFood,
        score: newScore,
        speed: newSpeed,
        direction: direction
      };
    });
  }, []);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === ' ') {
      e.preventDefault();
      togglePause();
      return;
    }

    setGameState(prevState => {
      if (prevState.isGameOver || !prevState.isPlaying) return prevState;

      let newDirection = prevState.nextDirection;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (prevState.direction !== 'DOWN') newDirection = 'UP';
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (prevState.direction !== 'UP') newDirection = 'DOWN';
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (prevState.direction !== 'RIGHT') newDirection = 'LEFT';
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (prevState.direction !== 'LEFT') newDirection = 'RIGHT';
          break;
      }

      return { ...prevState, nextDirection: newDirection };
    });
  }, []);

  const startGame = useCallback(() => {
    setGameState(prevState => ({
      snake: INITIAL_SNAKE,
      food: generateFood(INITIAL_SNAKE),
      direction: 'RIGHT',
      nextDirection: 'RIGHT',
      score: 0,
      highScore: prevState.highScore,
      isGameOver: false,
      isPaused: false,
      isPlaying: true,
      speed: INITIAL_SPEED
    }));
  }, []);

  const togglePause = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      isPaused: !prevState.isPaused
    }));
  }, []);

  // Game loop
  useEffect(() => {
    if (gameState.isPlaying && !gameState.isGameOver && !gameState.isPaused) {
      gameLoopRef.current = setInterval(moveSnake, gameState.speed);
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState.isPlaying, gameState.isGameOver, gameState.isPaused, gameState.speed, moveSnake]);

  // Keyboard controls
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return {
    gameState,
    startGame,
    togglePause
  };
};