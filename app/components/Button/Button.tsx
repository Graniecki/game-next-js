import React from 'react';
import Link from 'next/link';
import styles from './Button.module.scss';

type Props = {
  text: string;
  href: string,
  replace?: boolean
};

function Button({ text, href, replace = false }: Props): JSX.Element {
  return (
    <Link href={href} className={styles.button} replace={replace}>
      {text}
    </Link>
  );
}

export default Button;
