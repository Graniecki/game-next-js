import React from 'react';
import clsx from 'clsx';
import money from '@/app/data/money.json';
import { formatNumber } from '@/app/lib/helpers';
import styles from './Results.module.scss';

type Props = {
  earnedMoney: number;
  currentAmount: number;
};

function Results({ earnedMoney, currentAmount }: Props): JSX.Element {
  return (
    <div className={styles.results}>
      {money.map((result) => (
        <div
          key={result.id}
          className={clsx({
            [styles.results__result]: true,
            [styles.state__earned]: earnedMoney >= result.amount,
            [styles.state__current]: currentAmount === result.amount,
          })}
        >
          <div className={styles.results__resultText}>
            <svg className={styles.mobileVisible} viewBox="0 0 240 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.5303 3.70404C15.6719 1.64809 18.5256 0.5 21.4944 0.5H218.506C221.474 0.5 224.328 1.64809 226.47 3.70404L239.278 16L226.47 28.296C224.328 30.3519 221.474 31.5 218.506 31.5H21.4944C18.5256 31.5 15.6719 30.3519 13.5303 28.296L0.721988 16L13.5303 3.70404Z"
                stroke="#D0D0D8"
              />
            </svg>

            <svg className={styles.desktopVisible} viewBox="0 0 240 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.4526 4.63788C15.6376 2.01596 18.8742 0.5 22.2872 0.5H217.713C221.126 0.5 224.362 2.01597 226.547 4.63788L239.349 20L226.547 35.3621C224.362 37.984 221.126 39.5 217.713 39.5H22.2872C18.8742 39.5 15.6376 37.984 13.4526 35.3621L0.650853 20L13.4526 4.63788Z"
                stroke="#D0D0D8"
              />
            </svg>

            <div className={styles.results__amount}>{`$${formatNumber(result.amount)}`}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Results;
