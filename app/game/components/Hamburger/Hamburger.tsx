import React from 'react';
import clsx from 'clsx';
import styles from './Hamburger.module.scss';

type Props = {
  isOpen: boolean;
  toggle: () => void;
};

function Hamburger({ isOpen, toggle }: Props): JSX.Element {
  return (
    <button
      type="button"
      className={clsx({
        [styles.hamburger]: true,
        [styles.opened]: isOpen,
      })}
      onClick={() => toggle()}
    >
      <span style={{ display: 'none' }}>Toggle Filters</span>
      <div className={styles.hamburger__lines}>
        <div className={styles.hamburger__line} />
        <div className={styles.hamburger__line} />
        <div className={styles.hamburger__line} />
      </div>
    </button>
  );
}

export default Hamburger;
