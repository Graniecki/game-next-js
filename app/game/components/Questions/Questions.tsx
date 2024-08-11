import React from 'react';
import clsx from 'clsx';
import { Answer, RoundStatus } from '@/app/lib/types';
import { getLetter } from '@/app/lib/helpers';
import styles from './Questions.module.scss';

type Props = {
  question: string;
  answers: Answer[];
  handleAnswer: (answer: Answer) => void;
  selectedAnswers: number[];
  roundStatus: RoundStatus;
};

function Questions({
  question,
  answers,
  handleAnswer,
  selectedAnswers,
  roundStatus,
}: Props): JSX.Element {
  return (
    <div className={styles.questions__questionList}>
      <div className={styles.questions__placeholder} />

      <div className={styles.questions__question}>
        {question}
      </div>

      <div className={styles.questions__answers}>
        {answers.map((answer, index) => (
          <button
            type="button"
            key={answer.id}
            onClick={() => handleAnswer(answer)}
            className={clsx({
              [styles.questions__answer]: true,
              [styles.state__selected]: selectedAnswers.includes(answer.id),
              [styles.state__pending]:
                roundStatus === RoundStatus.preparation && selectedAnswers.includes(answer.id),
              [styles.state__correct]: roundStatus === RoundStatus.verification && answer.isCorrect,
              [styles.state__wrong]:
                roundStatus === RoundStatus.verification
                && selectedAnswers.includes(answer.id) && !answer.isCorrect,
            })}
          >
            <div className={styles.questions__answerContent}>
              <span className={styles.questions__answerLetter}>{getLetter(index + 1)}</span>
              <span className={styles.questions__answerText}>{answer.title}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Questions;
