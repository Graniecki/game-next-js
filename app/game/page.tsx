import React from 'react';
import questions from '@/app/data/questions.json';
import answers from '@/app/data/answers.json';
import money from '@/app/data/money.json';
import { Round } from '@/app/lib/types';
import { getRounds, shuffleArray } from '@/app/lib/helpers';
import GameField from './components/GameField/GameField';

function Game(): JSX.Element {
  const rounds: Round[] = getRounds(shuffleArray(questions), shuffleArray(answers), money);

  return (
    <GameField rounds={rounds} />
  );
}

export default Game;
