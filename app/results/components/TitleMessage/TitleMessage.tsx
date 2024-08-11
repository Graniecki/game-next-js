'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { formatNumber } from '@/app/lib/helpers';
import styles from './TitleMessage.module.scss';

function TitleMessage(): JSX.Element {
  const searchParams = useSearchParams();
  const prizeQuery: string | null = searchParams.get('prize');
  const prize: number = prizeQuery !== null ? +prizeQuery : 0;

  return (
    <h1 className={styles.title}>{`$${formatNumber(prize)} earned`}</h1>
  );
}

export default TitleMessage;
