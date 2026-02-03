import React from 'react';
import { RotateCcw, Trophy } from 'lucide-react';

interface GameOverProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

export default function GameOver({ score, highScore, onRestart }: GameOverProps) {
  const isNewRecord = score === highScore && score > 0;

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-10">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl text-center max-w-md w-full mx-4">
        <h2 className="text-4xl font-bold mb-4 text-red-400">Игра окончена!</h2>
        
        {isNewRecord && (
          <div className="mb-6 animate-pulse">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-yellow-400">Новый рекорд!</p>
          </div>
        )}
        
        <div className="mb-8 space-y-2">
          <p className="text-2xl">Ваш счёт: <span className="font-bold text-green-400">{score}</span></p>
          <p className="text-lg text-gray-400">Рекорд: <span className="font-semibold text-yellow-400">{highScore}</span></p>
        </div>
        
        <button
          onClick={onRestart}
          className="flex items-center gap-2 mx-auto px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95"
        >
          <RotateCcw className="w-5 h-5" />
          Играть снова
        </button>
      </div>
    </div>
  );
}