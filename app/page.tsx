import React from 'react';
import Image from 'next/image';
import styles from './page.module.scss';
import Button from './components/Button/Button';

export default function Home(): JSX.Element {
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
          <h1 className={styles.home__title}>Who wants to be a millionaire?</h1>
          <div className={styles.home__button}>
            <Button href="/game" text="Start" />
          </div>
        </div>
      </div>
    </div>
  );
}
