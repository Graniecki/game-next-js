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
            {`$${formatNumber(result.amount)}`}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Results;
