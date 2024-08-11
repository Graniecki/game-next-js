import React, { Suspense } from 'react';
import Image from 'next/image';
import TitleMessage from './components/TitleMessage/TitleMessage';
import Button from '../components/Button/Button';
import styles from './Results.module.scss';

function Results(): JSX.Element {
  return (
    <div className={styles.home}>
      <div className={styles.home__container}>
        <div className={styles.home__image}>
          <Image
            src="/thumb-up.svg"
            alt="Thumb up"
            width={197}
            height={156}
          />
        </div>
        <div className={styles.home__info}>
          <div>
            <h3 className={styles.home__subTitle}>Total score:</h3>
            <Suspense fallback={<div>Loading...</div>}>
              <TitleMessage />
            </Suspense>
          </div>
          <div className={styles.home__button}>
            <Button href="/game?new-attemtion" text="Try again" replace />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
