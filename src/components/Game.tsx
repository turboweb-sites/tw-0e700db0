import React from 'react';
import { Play, Pause, Info } from 'lucide-react';
import GameBoard from './GameBoard';
import ScoreBoard from './ScoreBoard';
import GameOver from './GameOver';
import { useSnakeGame } from '../hooks/useSnakeGame';

export default function Game() {
  const { gameState, startGame, togglePause } = useSnakeGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
          Змейка
        </h1>
        
        <div className="space-y-6">
          <ScoreBoard score={gameState.score} highScore={gameState.highScore} />
          
          <div className="relative">
            <GameBoard snake={gameState.snake} food={gameState.food} />
            
            {gameState.isGameOver && (
              <GameOver
                score={gameState.score}
                highScore={gameState.highScore}
                onRestart={startGame}
              />
            )}
            
            {!gameState.isPlaying && !gameState.isGameOver && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
                <button
                  onClick={startGame}
                  className="flex items-center gap-3 px-10 py-5 bg-green-500 hover:bg-green-600 text-white font-bold text-xl rounded-lg transition-all transform hover:scale-105 active:scale-95"
                >
                  <Play className="w-8 h-8" />
                  Начать игру
                </button>
              </div>
            )}
            
            {gameState.isPaused && gameState.isPlaying && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="text-center">
                  <Pause className="w-16 h-16 text-white mx-auto mb-4" />
                  <p className="text-3xl font-bold text-white mb-4">Пауза</p>
                  <p className="text-gray-300">Нажмите пробел для продолжения</p>
                </div>
              </div>
            )}
          </div>
          
          {gameState.isPlaying && (
            <div className="flex justify-center">
              <button
                onClick={togglePause}
                className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all"
              >
                {gameState.isPaused ? (
                  <>
                    <Play className="w-5 h-5" />
                    Продолжить
                  </>
                ) : (
                  <>
                    <Pause className="w-5 h-5" />
                    Пауза
                  </>
                )}
              </button>
            </div>
          )}
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold">Управление</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <p><span className="text-white font-medium">Стрелки / WASD</span> — движение</p>
                <p><span className="text-white font-medium">Пробел</span> — пауза</p>
              </div>
              <div>
                <p><span className="text-green-400">●</span> Змейка</p>
                <p><span className="text-red-400">●</span> Еда (+10 очков)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}