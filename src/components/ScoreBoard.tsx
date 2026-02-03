import React from 'react';
import { Trophy, Target } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
  highScore: number;
}

export default function ScoreBoard({ score, highScore }: ScoreBoardProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
      <div className="flex items-center gap-3 bg-gray-800 px-6 py-3 rounded-lg">
        <Target className="w-6 h-6 text-green-400" />
        <div>
          <p className="text-sm text-gray-400">Счёт</p>
          <p className="text-2xl font-bold text-green-400">{score}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3 bg-gray-800 px-6 py-3 rounded-lg">
        <Trophy className="w-6 h-6 text-yellow-400" />
        <div>
          <p className="text-sm text-gray-400">Рекорд</p>
          <p className="text-2xl font-bold text-yellow-400">{highScore}</p>
        </div>
      </div>
    </div>
  );
}