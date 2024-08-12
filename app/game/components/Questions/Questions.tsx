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
              <svg viewBox="0 0 288 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16.8175 5.31576C18.9762 2.29361 22.4615 0.5 26.1754 0.5H261.825C265.539 0.5 269.024 2.29361 271.183 5.31576L287.386 28L271.183 50.6842C269.024 53.7064 265.539 55.5 261.825 55.5H26.1754C22.4615 55.5 18.9762 53.7064 16.8175 50.6842L0.614452 28L16.8175 5.31576Z"
                  stroke="#D0D0D8"
                />
              </svg>

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
