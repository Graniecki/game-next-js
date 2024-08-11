'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { Answer, Round, RoundStatus } from '@/app/lib/types';
import { compareArrays, pause } from '@/app/lib/helpers';
import Questions from '../Questions/Questions';
import Results from '../Results/Results';
import styles from './GameField.module.scss';
import Hamburger from '../Hamburger/Hamburger';

type Props = {
  rounds: Round[],
};

function GameField({ rounds }: Props): JSX.Element {
  const router = useRouter();
  const [currentRound, setCurrentRound] = useState(rounds[0]);
  const [roundStatus, setRoundStatus] = useState<RoundStatus>(RoundStatus.active);
  const [attemptions, setAttemptions] = useState(currentRound.correctAnswersAmount);
  const [selectedAnswerIds, setSelectedAnswerIds] = useState<number[]>([]);
  const [earnedMoney, setEarnedMoney] = useState(0);
  const [openResults, setOpenResults] = useState(false);

  const handleAnswer = async (answer: Answer) => {
    if (selectedAnswerIds.includes(answer.id) || roundStatus !== RoundStatus.active) {
      return;
    }

    const attemptionsLeft = attemptions - 1;
    const selectedAnswers = [...selectedAnswerIds, answer.id];

    setAttemptions(attemptionsLeft);
    setSelectedAnswerIds(selectedAnswers);

    if (attemptionsLeft > 0) {
      return;
    }

    setRoundStatus(RoundStatus.pending);
    await pause(1000);
    setRoundStatus(RoundStatus.preparation);
    await pause(3000);
    setRoundStatus(RoundStatus.verification);
    await pause(2000);

    const isCorrectAnswer = compareArrays(currentRound.correctAnswerIds, selectedAnswers);

    if (!isCorrectAnswer) {
      router.replace(`/results?prize=${earnedMoney}`);
      return;
    }

    const nextRound = rounds.find((round: Round): boolean => round.id === currentRound.id + 1);

    if (!nextRound) {
      router.replace(`/results?prize=${currentRound.money}`);
      return;
    }

    setSelectedAnswerIds([]);
    setEarnedMoney(currentRound.money);
    setCurrentRound(nextRound);
    setAttemptions(nextRound.correctAnswersAmount);
    setRoundStatus(RoundStatus.active);
  };

  const toggleResults = () => {
    setOpenResults(!openResults);
  };

  return (
    <div className={styles.gameField}>
      <div className={styles.gameField__container}>
        <div className={styles.gameField__header}>
          <Hamburger
            isOpen={openResults}
            toggle={toggleResults}
          />
        </div>

        <div className={styles.gameField__grid}>
          <div className={styles.gameField__questions}>
            <Questions
              question={currentRound.question}
              answers={currentRound.answers}
              selectedAnswers={selectedAnswerIds}
              handleAnswer={handleAnswer}
              roundStatus={roundStatus}
            />
          </div>

          <div className={clsx({
            [styles.gameField__results]: true,
            [styles.state__visible]: openResults,
          })}
          >
            <Results
              earnedMoney={earnedMoney}
              currentAmount={currentRound.money}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameField;
